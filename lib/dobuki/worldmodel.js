(function (global, factory) {
 	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
 	typeof define === 'function' && define.amd ? define(['exports'], factory) :
 	(factory((global.DOBUKI = global.DOBUKI || {})));
 }(this, (function (core) { 'use strict';
 
    /**
     *  FUNCTION DEFINITIONS
     */
   
    /**
     *  PUBLIC DECLARATIONS
     */
   
   /**
    *   PROCESSES
    */
    core.requireScripts(['setup.js']);
    core.logScript();
 })));