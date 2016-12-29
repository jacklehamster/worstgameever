(function (global, factory) {
 	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
 	typeof define === 'function' && define.amd ? define(['exports'], factory) :
 	(factory((global.DOBUKI = global.DOBUKI || {})));
 }(this, (function (core) { 'use strict';
 
   var coreLoops = [];
   var removeCurrent = false;
   var skip = false;
   
    /**
     *  FUNCTION DEFINITIONS
     */
    function loop(time) {
        core.time = time;
        for(var i=0; i<coreLoops.length; i++) {
            var process = coreLoops[i];
            if(process.time < core.time) {
                process.time = Math.ceil(core.time/process.period) * process.period;
                for(var j=0;j<process.callbacks.length;j++) {
                    var callback = process.callbacks[j];
                    callback.call(null);
                    if (removeCurrent) {
                        removeCallback(callback);
                        removeCurrent = false;
                        j--;
                    }
                    if(skip) {
                        skip = false;
                        break;
                    }
                }
            }
        }
        requestAnimationFrame( loop );
    }
    
    function addLoop(period, callback) {
        core.expectParams(arguments, "number", "function|object");
        period = !period || period<0 ? 1 : period;
        coreLoops.push(
            {
                time: 0,
                period: period,
                callbacks: Array.isArray(callback) ? callback : [callback],
            }
        );
    }
    
    function removeCurrentCallback() {
        removeCurrent = true;
    }
    
    function removeCallback(callback) {
        core.expectParams(arguments, "function|object");
        if(Array.isArray(callback)) {
            return callback.some(function(f) {
                return removeCallback(f);
            });
        }
        for(var i=0; i<coreLoops.length; i++) {
            var process = coreLoops[i];
            var index = process.callbacks.indexOf(callback);
            if(index >= 0) {
                process.callbacks.splice(index, 1);
                return true;
            }
        }
        return false;
    }
    
    function skipCallbacks() {
        skip = true;
    }
    
    function beginLoop() {
        loop();
    }
    
    function loopTime() {
        return performance.now() - core.time;
    }
    
    function destroyEverything() {
        coreLoops = null;
    }
        
    /**
     *  PUBLIC DECLARATIONS
     */
   core.addLoop = addLoop;
   core.removeLoop = removeCallback;
   core.removeCurrentCallback = removeCurrentCallback;
   core.skipCallbacks = skipCallbacks;
   core.loopTime = loopTime;
   core.destroyEverything = core.combineMethods(destroyEverything, core.destroyEverything);

   /**
    *   PROCESSES
    */
    core.requireScripts(['setup.js', 'utils.js']);
    core.logScript();
    beginLoop();

 })));