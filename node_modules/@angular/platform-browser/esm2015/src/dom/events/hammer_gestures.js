/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgModule, Optional, ɵConsole as Console } from '@angular/core';
import { EVENT_MANAGER_PLUGINS, EventManagerPlugin } from './event_manager';
/**
 * Supported HammerJS recognizer event names.
 */
import * as ɵngcc0 from '@angular/core';
const EVENT_NAMES = {
    // pan
    'pan': true,
    'panstart': true,
    'panmove': true,
    'panend': true,
    'pancancel': true,
    'panleft': true,
    'panright': true,
    'panup': true,
    'pandown': true,
    // pinch
    'pinch': true,
    'pinchstart': true,
    'pinchmove': true,
    'pinchend': true,
    'pinchcancel': true,
    'pinchin': true,
    'pinchout': true,
    // press
    'press': true,
    'pressup': true,
    // rotate
    'rotate': true,
    'rotatestart': true,
    'rotatemove': true,
    'rotateend': true,
    'rotatecancel': true,
    // swipe
    'swipe': true,
    'swipeleft': true,
    'swiperight': true,
    'swipeup': true,
    'swipedown': true,
    // tap
    'tap': true,
};
/**
 * DI token for providing [HammerJS](http://hammerjs.github.io/) support to Angular.
 * @see `HammerGestureConfig`
 *
 * @ngModule HammerModule
 * @publicApi
 */
export const HAMMER_GESTURE_CONFIG = new InjectionToken('HammerGestureConfig');
/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * @publicApi
 */
export const HAMMER_LOADER = new InjectionToken('HammerLoader');
/**
 * An injectable [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
 * for gesture recognition. Configures specific event recognition.
 * @publicApi
 */
export class HammerGestureConfig {
    constructor() {
        /**
         * A set of supported event names for gestures to be used in Angular.
         * Angular supports all built-in recognizers, as listed in
         * [HammerJS documentation](http://hammerjs.github.io/).
         */
        this.events = [];
        /**
         * Maps gesture event names to a set of configuration options
         * that specify overrides to the default values for specific properties.
         *
         * The key is a supported event name to be configured,
         * and the options object contains a set of properties, with override values
         * to be applied to the named recognizer event.
         * For example, to disable recognition of the rotate event, specify
         *  `{"rotate": {"enable": false}}`.
         *
         * Properties that are not present take the HammerJS default values.
         * For information about which properties are supported for which events,
         * and their allowed and default values, see
         * [HammerJS documentation](http://hammerjs.github.io/).
         *
         */
        this.overrides = {};
    }
    /**
     * Creates a [HammerJS Manager](http://hammerjs.github.io/api/#hammer.manager)
     * and attaches it to a given HTML element.
     * @param element The element that will recognize gestures.
     * @returns A HammerJS event-manager object.
     */
    buildHammer(element) {
        const mc = new Hammer(element, this.options);
        mc.get('pinch').set({ enable: true });
        mc.get('rotate').set({ enable: true });
        for (const eventName in this.overrides) {
            mc.get(eventName).set(this.overrides[eventName]);
        }
        return mc;
    }
}
HammerGestureConfig.ɵfac = function HammerGestureConfig_Factory(t) { return new (t || HammerGestureConfig)(); };
HammerGestureConfig.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: HammerGestureConfig, factory: HammerGestureConfig.ɵfac });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HammerGestureConfig, [{
        type: Injectable
    }], function () { return []; }, null); })();
/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */
export class HammerGesturesPlugin extends EventManagerPlugin {
    constructor(doc, _config, console, loader) {
        super(doc);
        this._config = _config;
        this.console = console;
        this.loader = loader;
    }
    supports(eventName) {
        if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
            return false;
        }
        if (!window.Hammer && !this.loader) {
            this.console.warn(`The "${eventName}" event cannot be bound because Hammer.JS is not ` +
                `loaded and no custom loader has been specified.`);
            return false;
        }
        return true;
    }
    addEventListener(element, eventName, handler) {
        const zone = this.manager.getZone();
        eventName = eventName.toLowerCase();
        // If Hammer is not present but a loader is specified, we defer adding the event listener
        // until Hammer is loaded.
        if (!window.Hammer && this.loader) {
            // This `addEventListener` method returns a function to remove the added listener.
            // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
            // than remove anything.
            let cancelRegistration = false;
            let deregister = () => {
                cancelRegistration = true;
            };
            this.loader()
                .then(() => {
                // If Hammer isn't actually loaded when the custom loader resolves, give up.
                if (!window.Hammer) {
                    this.console.warn(`The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
                    deregister = () => { };
                    return;
                }
                if (!cancelRegistration) {
                    // Now that Hammer is loaded and the listener is being loaded for real,
                    // the deregistration function changes from canceling registration to removal.
                    deregister = this.addEventListener(element, eventName, handler);
                }
            })
                .catch(() => {
                this.console.warn(`The "${eventName}" event cannot be bound because the custom ` +
                    `Hammer.JS loader failed.`);
                deregister = () => { };
            });
            // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
            // can change the behavior of `deregister` once the listener is added. Using a closure in
            // this way allows us to avoid any additional data structures to track listener removal.
            return () => {
                deregister();
            };
        }
        return zone.runOutsideAngular(() => {
            // Creating the manager bind events, must be done outside of angular
            const mc = this._config.buildHammer(element);
            const callback = function (eventObj) {
                zone.runGuarded(function () {
                    handler(eventObj);
                });
            };
            mc.on(eventName, callback);
            return () => {
                mc.off(eventName, callback);
                // destroy mc to prevent memory leak
                if (typeof mc.destroy === 'function') {
                    mc.destroy();
                }
            };
        });
    }
    isCustomEvent(eventName) {
        return this._config.events.indexOf(eventName) > -1;
    }
}
HammerGesturesPlugin.ɵfac = function HammerGesturesPlugin_Factory(t) { return new (t || HammerGesturesPlugin)(ɵngcc0.ɵɵinject(DOCUMENT), ɵngcc0.ɵɵinject(HAMMER_GESTURE_CONFIG), ɵngcc0.ɵɵinject(ɵngcc0.ɵConsole), ɵngcc0.ɵɵinject(HAMMER_LOADER, 8)); };
HammerGesturesPlugin.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: HammerGesturesPlugin, factory: HammerGesturesPlugin.ɵfac });
HammerGesturesPlugin.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: HammerGestureConfig, decorators: [{ type: Inject, args: [HAMMER_GESTURE_CONFIG,] }] },
    { type: Console },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [HAMMER_LOADER,] }] }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HammerGesturesPlugin, [{
        type: Injectable
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: HammerGestureConfig, decorators: [{
                type: Inject,
                args: [HAMMER_GESTURE_CONFIG]
            }] }, { type: ɵngcc0.ɵConsole }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [HAMMER_LOADER]
            }] }]; }, null); })();
/**
 * In Ivy, support for Hammer gestures is optional, so applications must
 * import the `HammerModule` at root to turn on support. This means that
 * Hammer-specific code can be tree-shaken away if not needed.
 */
export const HAMMER_PROVIDERS__POST_R3__ = [];
/**
 * In View Engine, support for Hammer gestures is built-in by default.
 */
export const HAMMER_PROVIDERS__PRE_R3__ = [
    {
        provide: EVENT_MANAGER_PLUGINS,
        useClass: HammerGesturesPlugin,
        multi: true,
        deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, Console, [new Optional(), HAMMER_LOADER]]
    },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: [] },
];
export const HAMMER_PROVIDERS = HAMMER_PROVIDERS__POST_R3__;
/**
 * Adds support for HammerJS.
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's EventManager.
 *
 * @publicApi
 */
export class HammerModule {
}
HammerModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: HammerModule });
HammerModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function HammerModule_Factory(t) { return new (t || HammerModule)(); }, providers: HAMMER_PROVIDERS__PRE_R3__ });
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(HammerModule, [{
        type: NgModule,
        args: [{ providers: HAMMER_PROVIDERS__PRE_R3__ }]
    }], null, null); })();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFtbWVyX2dlc3R1cmVzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFZLFFBQVEsSUFBSSxPQUFPLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFcEgsT0FBTyxFQUFDLHFCQUFxQixFQUFFLGtCQUFrQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFJMUU7QUFDQTtBQUNBLEdBQUc7O0FBQ0gsTUFBTSxXQUFXLEdBQUc7QUFDcEIsSUFBRSxNQUFNO0FBQ1IsSUFBRSxLQUFLLEVBQUUsSUFBSTtBQUNiLElBQUUsVUFBVSxFQUFFLElBQUk7QUFDbEIsSUFBRSxTQUFTLEVBQUUsSUFBSTtBQUNqQixJQUFFLFFBQVEsRUFBRSxJQUFJO0FBQ2hCLElBQUUsV0FBVyxFQUFFLElBQUk7QUFDbkIsSUFBRSxTQUFTLEVBQUUsSUFBSTtBQUNqQixJQUFFLFVBQVUsRUFBRSxJQUFJO0FBQ2xCLElBQUUsT0FBTyxFQUFFLElBQUk7QUFDZixJQUFFLFNBQVMsRUFBRSxJQUFJO0FBQ2pCLElBQUUsUUFBUTtBQUNWLElBQUUsT0FBTyxFQUFFLElBQUk7QUFDZixJQUFFLFlBQVksRUFBRSxJQUFJO0FBQ3BCLElBQUUsV0FBVyxFQUFFLElBQUk7QUFDbkIsSUFBRSxVQUFVLEVBQUUsSUFBSTtBQUNsQixJQUFFLGFBQWEsRUFBRSxJQUFJO0FBQ3JCLElBQUUsU0FBUyxFQUFFLElBQUk7QUFDakIsSUFBRSxVQUFVLEVBQUUsSUFBSTtBQUNsQixJQUFFLFFBQVE7QUFDVixJQUFFLE9BQU8sRUFBRSxJQUFJO0FBQ2YsSUFBRSxTQUFTLEVBQUUsSUFBSTtBQUNqQixJQUFFLFNBQVM7QUFDWCxJQUFFLFFBQVEsRUFBRSxJQUFJO0FBQ2hCLElBQUUsYUFBYSxFQUFFLElBQUk7QUFDckIsSUFBRSxZQUFZLEVBQUUsSUFBSTtBQUNwQixJQUFFLFdBQVcsRUFBRSxJQUFJO0FBQ25CLElBQUUsY0FBYyxFQUFFLElBQUk7QUFDdEIsSUFBRSxRQUFRO0FBQ1YsSUFBRSxPQUFPLEVBQUUsSUFBSTtBQUNmLElBQUUsV0FBVyxFQUFFLElBQUk7QUFDbkIsSUFBRSxZQUFZLEVBQUUsSUFBSTtBQUNwQixJQUFFLFNBQVMsRUFBRSxJQUFJO0FBQ2pCLElBQUUsV0FBVyxFQUFFLElBQUk7QUFDbkIsSUFBRSxNQUFNO0FBQ1IsSUFBRSxLQUFLLEVBQUUsSUFBSTtBQUNiLENBQUMsQ0FBQztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLGNBQWMsQ0FBc0IscUJBQXFCLENBQUMsQ0FBQztBQVVwRztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxjQUFjLENBQWUsY0FBYyxDQUFDLENBQUM7QUFROUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBRUgsTUFBTSxPQUFPLG1CQUFtQjtBQUNoQyxJQUZBO0FBQ0UsUUFDQTtBQUNGO0FBQ007QUFDTTtBQUVBLFdBRFA7QUFDTCxRQUFFLFdBQU0sR0FBYSxFQUFFLENBQUM7QUFDeEIsUUFDRTtBQUNGO0FBQ007QUFFQztBQUFXO0FBQ007QUFDTTtBQUNNO0FBRWpDO0FBQ3dDO0FBQVc7QUFDTTtBQUV6QztBQUdqQjtBQUdlO0FBQVcsV0FKdkI7QUFDTCxRQUFFLGNBQVMsR0FBNEIsRUFBRSxDQUFDO0FBQzFDLElBcUNBLENBQUM7QUFDRCxJQW5CRTtBQUNGO0FBQ0U7QUFDRTtBQUNFO0FBRUosT0FERztBQUNMLElBQUUsV0FBVyxDQUFDLE9BQW9CO0FBQUksUUFDbEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDeEMsUUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ3pDLFFBQ0ksS0FBSyxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQzVDLFlBQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELFNBQUs7QUFDTCxRQUNJLE9BQU8sRUFBRSxDQUFDO0FBQ2QsSUFBRSxDQUFDO0FBQ0g7K0NBL0RDLFVBQVU7Ozs7Z0RBQ1Q7QUFnRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBRUgsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGtCQUFrQjtBQUM1RCxJQUFFLFlBQ3NCLEdBQVEsRUFDYSxPQUE0QixFQUFVLE9BQWdCLEVBQ2xELE1BQTBCO0FBQzNFLFFBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsUUFINkMsWUFBTyxHQUFQLE9BQU8sQ0FBcUI7QUFBQyxRQUFTLFlBQU8sR0FBUCxPQUFPLENBQVM7QUFBQyxRQUNuRCxXQUFNLEdBQU4sTUFBTSxDQUFvQjtBQUFDLElBRTFFLENBQUM7QUFDSCxJQUNFLFFBQVEsQ0FBQyxTQUFpQjtBQUFJLFFBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUNoRyxZQUFNLE9BQU8sS0FBSyxDQUFDO0FBQ25CLFNBQUs7QUFDTCxRQUNJLElBQUksQ0FBRSxNQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNqRCxZQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNiLFFBQVEsU0FBUyxtREFBbUQ7QUFDOUUsZ0JBQVUsaURBQWlELENBQUMsQ0FBQztBQUM3RCxZQUFNLE9BQU8sS0FBSyxDQUFDO0FBQ25CLFNBQUs7QUFDTCxRQUNJLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLElBQUUsQ0FBQztBQUNILElBQ0UsZ0JBQWdCLENBQUMsT0FBb0IsRUFBRSxTQUFpQixFQUFFLE9BQWlCO0FBQUksUUFDN0UsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4QyxRQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDeEMsUUFDSSx5RkFBeUY7QUFDN0YsUUFBSSwwQkFBMEI7QUFDOUIsUUFBSSxJQUFJLENBQUUsTUFBYyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2hELFlBQU0sa0ZBQWtGO0FBQ3hGLFlBQU0sMEZBQTBGO0FBQ2hHLFlBQU0sd0JBQXdCO0FBQzlCLFlBQU0sSUFBSSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDckMsWUFBTSxJQUFJLFVBQVUsR0FBYSxHQUFHLEVBQUU7QUFDdEMsZ0JBQVEsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLFlBQU0sQ0FBQyxDQUFDO0FBQ1IsWUFDTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ25CLGlCQUFXLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDckIsZ0JBQVksNEVBQTRFO0FBQ3hGLGdCQUFZLElBQUksQ0FBRSxNQUFjLENBQUMsTUFBTSxFQUFFO0FBQ3pDLG9CQUFjLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNiLG1FQUFtRSxDQUFDLENBQUM7QUFDdkYsb0JBQWMsVUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztBQUNwQyxvQkFBYyxPQUFPO0FBQ3JCLGlCQUFhO0FBQ2IsZ0JBQ1ksSUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQ3JDLG9CQUFjLHVFQUF1RTtBQUNyRixvQkFBYyw4RUFBOEU7QUFDNUYsb0JBQWMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQzlFLGlCQUFhO0FBQ2IsWUFBVSxDQUFDLENBQUM7QUFDWixpQkFBVyxLQUFLLENBQUMsR0FBRyxFQUFFO0FBQ3RCLGdCQUFZLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNiLFFBQVEsU0FBUyw2Q0FBNkM7QUFDOUUsb0JBQWdCLDBCQUEwQixDQUFDLENBQUM7QUFDNUMsZ0JBQVksVUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztBQUNsQyxZQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2IsWUFDTSwwRkFBMEY7QUFDaEcsWUFBTSx5RkFBeUY7QUFDL0YsWUFBTSx3RkFBd0Y7QUFDOUYsWUFBTSxPQUFPLEdBQUcsRUFBRTtBQUNsQixnQkFBUSxVQUFVLEVBQUUsQ0FBQztBQUNyQixZQUFNLENBQUMsQ0FBQztBQUNSLFNBQUs7QUFDTCxRQUNJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtBQUN2QyxZQUFNLG9FQUFvRTtBQUMxRSxZQUFNLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELFlBQU0sTUFBTSxRQUFRLEdBQUcsVUFBUyxRQUFxQjtBQUNyRCxnQkFBUSxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3ZCLG9CQUFTLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM1QixnQkFBUSxDQUFDLENBQUMsQ0FBQztBQUNYLFlBQU0sQ0FBQyxDQUFDO0FBQ1IsWUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNqQyxZQUFNLE9BQU8sR0FBRyxFQUFFO0FBQ2xCLGdCQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLGdCQUFRLG9DQUFvQztBQUM1QyxnQkFBUSxJQUFJLE9BQU8sRUFBRSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDOUMsb0JBQVUsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3ZCLGlCQUFTO0FBQ1QsWUFBTSxDQUFDLENBQUM7QUFDUixRQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ1AsSUFBRSxDQUFDO0FBQ0gsSUFDRSxhQUFhLENBQUMsU0FBaUI7QUFBSSxRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2RCxJQUFFLENBQUM7QUFDSDtnREE1RkMsVUFBVTs0SEFDVDtBQUFDO0FBQThDLDRDQUUxQyxNQUFNLFNBQUMsUUFBUTtBQUFTLFlBQ3VCLG1CQUFtQix1QkFBbEUsTUFBTSxTQUFDLHFCQUFxQjtBQUFTLFlBNUowQyxPQUFPO0FBQUksNENBNkoxRixRQUFRLFlBQUksTUFBTSxTQUFDLGFBQWE7QUFBUTs7Ozs7Ozs7Ozs7Ozs7a0NBQUU7QUF5RmpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILE1BQU0sQ0FBQyxNQUFNLDJCQUEyQixHQUFHLEVBQUUsQ0FBQztBQUU5QztBQUNBO0FBQ0EsR0FBRztBQUNILE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFlO0FBQ3RELElBQUU7QUFDRixRQUFJLE9BQU8sRUFBRSxxQkFBcUI7QUFDbEMsUUFBSSxRQUFRLEVBQUUsb0JBQW9CO0FBQ2xDLFFBQUksS0FBSyxFQUFFLElBQUk7QUFDZixRQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3JGLEtBQUc7QUFDSCxJQUFFLEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO0FBQzNFLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLDJCQUEwQixDQUFDO0FBRTNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUVILE1BQU0sT0FBTyxZQUFZO0FBQ3pCO3dDQUZDLFFBQVEsU0FBQyxFQUFDLFNBQVM7Q0FBRSwwQkFBMEIsRUFBQzs7OzswQkFDNUM7QUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFByb3ZpZGVyLCDJtUNvbnNvbGUgYXMgQ29uc29sZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7RVZFTlRfTUFOQUdFUl9QTFVHSU5TLCBFdmVudE1hbmFnZXJQbHVnaW59IGZyb20gJy4vZXZlbnRfbWFuYWdlcic7XG5cblxuXG4vKipcbiAqIFN1cHBvcnRlZCBIYW1tZXJKUyByZWNvZ25pemVyIGV2ZW50IG5hbWVzLlxuICovXG5jb25zdCBFVkVOVF9OQU1FUyA9IHtcbiAgLy8gcGFuXG4gICdwYW4nOiB0cnVlLFxuICAncGFuc3RhcnQnOiB0cnVlLFxuICAncGFubW92ZSc6IHRydWUsXG4gICdwYW5lbmQnOiB0cnVlLFxuICAncGFuY2FuY2VsJzogdHJ1ZSxcbiAgJ3BhbmxlZnQnOiB0cnVlLFxuICAncGFucmlnaHQnOiB0cnVlLFxuICAncGFudXAnOiB0cnVlLFxuICAncGFuZG93bic6IHRydWUsXG4gIC8vIHBpbmNoXG4gICdwaW5jaCc6IHRydWUsXG4gICdwaW5jaHN0YXJ0JzogdHJ1ZSxcbiAgJ3BpbmNobW92ZSc6IHRydWUsXG4gICdwaW5jaGVuZCc6IHRydWUsXG4gICdwaW5jaGNhbmNlbCc6IHRydWUsXG4gICdwaW5jaGluJzogdHJ1ZSxcbiAgJ3BpbmNob3V0JzogdHJ1ZSxcbiAgLy8gcHJlc3NcbiAgJ3ByZXNzJzogdHJ1ZSxcbiAgJ3ByZXNzdXAnOiB0cnVlLFxuICAvLyByb3RhdGVcbiAgJ3JvdGF0ZSc6IHRydWUsXG4gICdyb3RhdGVzdGFydCc6IHRydWUsXG4gICdyb3RhdGVtb3ZlJzogdHJ1ZSxcbiAgJ3JvdGF0ZWVuZCc6IHRydWUsXG4gICdyb3RhdGVjYW5jZWwnOiB0cnVlLFxuICAvLyBzd2lwZVxuICAnc3dpcGUnOiB0cnVlLFxuICAnc3dpcGVsZWZ0JzogdHJ1ZSxcbiAgJ3N3aXBlcmlnaHQnOiB0cnVlLFxuICAnc3dpcGV1cCc6IHRydWUsXG4gICdzd2lwZWRvd24nOiB0cnVlLFxuICAvLyB0YXBcbiAgJ3RhcCc6IHRydWUsXG59O1xuXG4vKipcbiAqIERJIHRva2VuIGZvciBwcm92aWRpbmcgW0hhbW1lckpTXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvLykgc3VwcG9ydCB0byBBbmd1bGFyLlxuICogQHNlZSBgSGFtbWVyR2VzdHVyZUNvbmZpZ2BcbiAqXG4gKiBAbmdNb2R1bGUgSGFtbWVyTW9kdWxlXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBIQU1NRVJfR0VTVFVSRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48SGFtbWVyR2VzdHVyZUNvbmZpZz4oJ0hhbW1lckdlc3R1cmVDb25maWcnKTtcblxuXG4vKipcbiAqIEZ1bmN0aW9uIHRoYXQgbG9hZHMgSGFtbWVySlMsIHJldHVybmluZyBhIHByb21pc2UgdGhhdCBpcyByZXNvbHZlZCBvbmNlIEhhbW1lckpzIGlzIGxvYWRlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCB0eXBlIEhhbW1lckxvYWRlciA9ICgpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogSW5qZWN0aW9uIHRva2VuIHVzZWQgdG8gcHJvdmlkZSBhIHtAbGluayBIYW1tZXJMb2FkZXJ9IHRvIEFuZ3VsYXIuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgSEFNTUVSX0xPQURFUiA9IG5ldyBJbmplY3Rpb25Ub2tlbjxIYW1tZXJMb2FkZXI+KCdIYW1tZXJMb2FkZXInKTtcblxuZXhwb3J0IGludGVyZmFjZSBIYW1tZXJJbnN0YW5jZSB7XG4gIG9uKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZDtcbiAgb2ZmKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IEZ1bmN0aW9uKTogdm9pZDtcbiAgZGVzdHJveT8oKTogdm9pZDtcbn1cblxuLyoqXG4gKiBBbiBpbmplY3RhYmxlIFtIYW1tZXJKUyBNYW5hZ2VyXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2FwaS8jaGFtbWVyLm1hbmFnZXIpXG4gKiBmb3IgZ2VzdHVyZSByZWNvZ25pdGlvbi4gQ29uZmlndXJlcyBzcGVjaWZpYyBldmVudCByZWNvZ25pdGlvbi5cbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhhbW1lckdlc3R1cmVDb25maWcge1xuICAvKipcbiAgICogQSBzZXQgb2Ygc3VwcG9ydGVkIGV2ZW50IG5hbWVzIGZvciBnZXN0dXJlcyB0byBiZSB1c2VkIGluIEFuZ3VsYXIuXG4gICAqIEFuZ3VsYXIgc3VwcG9ydHMgYWxsIGJ1aWx0LWluIHJlY29nbml6ZXJzLCBhcyBsaXN0ZWQgaW5cbiAgICogW0hhbW1lckpTIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKS5cbiAgICovXG4gIGV2ZW50czogc3RyaW5nW10gPSBbXTtcblxuICAvKipcbiAgICogTWFwcyBnZXN0dXJlIGV2ZW50IG5hbWVzIHRvIGEgc2V0IG9mIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKiB0aGF0IHNwZWNpZnkgb3ZlcnJpZGVzIHRvIHRoZSBkZWZhdWx0IHZhbHVlcyBmb3Igc3BlY2lmaWMgcHJvcGVydGllcy5cbiAgICpcbiAgICogVGhlIGtleSBpcyBhIHN1cHBvcnRlZCBldmVudCBuYW1lIHRvIGJlIGNvbmZpZ3VyZWQsXG4gICAqIGFuZCB0aGUgb3B0aW9ucyBvYmplY3QgY29udGFpbnMgYSBzZXQgb2YgcHJvcGVydGllcywgd2l0aCBvdmVycmlkZSB2YWx1ZXNcbiAgICogdG8gYmUgYXBwbGllZCB0byB0aGUgbmFtZWQgcmVjb2duaXplciBldmVudC5cbiAgICogRm9yIGV4YW1wbGUsIHRvIGRpc2FibGUgcmVjb2duaXRpb24gb2YgdGhlIHJvdGF0ZSBldmVudCwgc3BlY2lmeVxuICAgKiAgYHtcInJvdGF0ZVwiOiB7XCJlbmFibGVcIjogZmFsc2V9fWAuXG4gICAqXG4gICAqIFByb3BlcnRpZXMgdGhhdCBhcmUgbm90IHByZXNlbnQgdGFrZSB0aGUgSGFtbWVySlMgZGVmYXVsdCB2YWx1ZXMuXG4gICAqIEZvciBpbmZvcm1hdGlvbiBhYm91dCB3aGljaCBwcm9wZXJ0aWVzIGFyZSBzdXBwb3J0ZWQgZm9yIHdoaWNoIGV2ZW50cyxcbiAgICogYW5kIHRoZWlyIGFsbG93ZWQgYW5kIGRlZmF1bHQgdmFsdWVzLCBzZWVcbiAgICogW0hhbW1lckpTIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9oYW1tZXJqcy5naXRodWIuaW8vKS5cbiAgICpcbiAgICovXG4gIG92ZXJyaWRlczoge1trZXk6IHN0cmluZ106IE9iamVjdH0gPSB7fTtcblxuICAvKipcbiAgICogUHJvcGVydGllcyB3aG9zZSBkZWZhdWx0IHZhbHVlcyBjYW4gYmUgb3ZlcnJpZGRlbiBmb3IgYSBnaXZlbiBldmVudC5cbiAgICogRGlmZmVyZW50IHNldHMgb2YgcHJvcGVydGllcyBhcHBseSB0byBkaWZmZXJlbnQgZXZlbnRzLlxuICAgKiBGb3IgaW5mb3JtYXRpb24gYWJvdXQgd2hpY2ggcHJvcGVydGllcyBhcmUgc3VwcG9ydGVkIGZvciB3aGljaCBldmVudHMsXG4gICAqIGFuZCB0aGVpciBhbGxvd2VkIGFuZCBkZWZhdWx0IHZhbHVlcywgc2VlXG4gICAqIFtIYW1tZXJKUyBkb2N1bWVudGF0aW9uXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvLykuXG4gICAqL1xuICBvcHRpb25zPzoge1xuICAgIGNzc1Byb3BzPzogYW55O1xuICAgIGRvbUV2ZW50cz86IGJvb2xlYW47XG4gICAgZW5hYmxlPzogYm9vbGVhbiB8ICgobWFuYWdlcjogYW55KSA9PiBib29sZWFuKTtcbiAgICBwcmVzZXQ/OiBhbnlbXTtcbiAgICB0b3VjaEFjdGlvbj86IHN0cmluZztcbiAgICByZWNvZ25pemVycz86IGFueVtdO1xuICAgIGlucHV0Q2xhc3M/OiBhbnk7XG4gICAgaW5wdXRUYXJnZXQ/OiBFdmVudFRhcmdldDtcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIFtIYW1tZXJKUyBNYW5hZ2VyXShodHRwOi8vaGFtbWVyanMuZ2l0aHViLmlvL2FwaS8jaGFtbWVyLm1hbmFnZXIpXG4gICAqIGFuZCBhdHRhY2hlcyBpdCB0byBhIGdpdmVuIEhUTUwgZWxlbWVudC5cbiAgICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCB3aWxsIHJlY29nbml6ZSBnZXN0dXJlcy5cbiAgICogQHJldHVybnMgQSBIYW1tZXJKUyBldmVudC1tYW5hZ2VyIG9iamVjdC5cbiAgICovXG4gIGJ1aWxkSGFtbWVyKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogSGFtbWVySW5zdGFuY2Uge1xuICAgIGNvbnN0IG1jID0gbmV3IEhhbW1lciEoZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcblxuICAgIG1jLmdldCgncGluY2gnKS5zZXQoe2VuYWJsZTogdHJ1ZX0pO1xuICAgIG1jLmdldCgncm90YXRlJykuc2V0KHtlbmFibGU6IHRydWV9KTtcblxuICAgIGZvciAoY29uc3QgZXZlbnROYW1lIGluIHRoaXMub3ZlcnJpZGVzKSB7XG4gICAgICBtYy5nZXQoZXZlbnROYW1lKS5zZXQodGhpcy5vdmVycmlkZXNbZXZlbnROYW1lXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1jO1xuICB9XG59XG5cbi8qKlxuICogRXZlbnQgcGx1Z2luIHRoYXQgYWRkcyBIYW1tZXIgc3VwcG9ydCB0byBhbiBhcHBsaWNhdGlvbi5cbiAqXG4gKiBAbmdNb2R1bGUgSGFtbWVyTW9kdWxlXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIYW1tZXJHZXN0dXJlc1BsdWdpbiBleHRlbmRzIEV2ZW50TWFuYWdlclBsdWdpbiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnksXG4gICAgICBASW5qZWN0KEhBTU1FUl9HRVNUVVJFX0NPTkZJRykgcHJpdmF0ZSBfY29uZmlnOiBIYW1tZXJHZXN0dXJlQ29uZmlnLCBwcml2YXRlIGNvbnNvbGU6IENvbnNvbGUsXG4gICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEhBTU1FUl9MT0FERVIpIHByaXZhdGUgbG9hZGVyPzogSGFtbWVyTG9hZGVyfG51bGwpIHtcbiAgICBzdXBlcihkb2MpO1xuICB9XG5cbiAgc3VwcG9ydHMoZXZlbnROYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIUVWRU5UX05BTUVTLmhhc093blByb3BlcnR5KGV2ZW50TmFtZS50b0xvd2VyQ2FzZSgpKSAmJiAhdGhpcy5pc0N1c3RvbUV2ZW50KGV2ZW50TmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoISh3aW5kb3cgYXMgYW55KS5IYW1tZXIgJiYgIXRoaXMubG9hZGVyKSB7XG4gICAgICB0aGlzLmNvbnNvbGUud2FybihcbiAgICAgICAgICBgVGhlIFwiJHtldmVudE5hbWV9XCIgZXZlbnQgY2Fubm90IGJlIGJvdW5kIGJlY2F1c2UgSGFtbWVyLkpTIGlzIG5vdCBgICtcbiAgICAgICAgICBgbG9hZGVkIGFuZCBubyBjdXN0b20gbG9hZGVyIGhhcyBiZWVuIHNwZWNpZmllZC5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudDogSFRNTEVsZW1lbnQsIGV2ZW50TmFtZTogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IEZ1bmN0aW9uIHtcbiAgICBjb25zdCB6b25lID0gdGhpcy5tYW5hZ2VyLmdldFpvbmUoKTtcbiAgICBldmVudE5hbWUgPSBldmVudE5hbWUudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIElmIEhhbW1lciBpcyBub3QgcHJlc2VudCBidXQgYSBsb2FkZXIgaXMgc3BlY2lmaWVkLCB3ZSBkZWZlciBhZGRpbmcgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgLy8gdW50aWwgSGFtbWVyIGlzIGxvYWRlZC5cbiAgICBpZiAoISh3aW5kb3cgYXMgYW55KS5IYW1tZXIgJiYgdGhpcy5sb2FkZXIpIHtcbiAgICAgIC8vIFRoaXMgYGFkZEV2ZW50TGlzdGVuZXJgIG1ldGhvZCByZXR1cm5zIGEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoZSBhZGRlZCBsaXN0ZW5lci5cbiAgICAgIC8vIFVudGlsIEhhbW1lciBpcyBsb2FkZWQsIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBuZWVkcyB0byAqY2FuY2VsKiB0aGUgcmVnaXN0cmF0aW9uIHJhdGhlclxuICAgICAgLy8gdGhhbiByZW1vdmUgYW55dGhpbmcuXG4gICAgICBsZXQgY2FuY2VsUmVnaXN0cmF0aW9uID0gZmFsc2U7XG4gICAgICBsZXQgZGVyZWdpc3RlcjogRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgICAgIGNhbmNlbFJlZ2lzdHJhdGlvbiA9IHRydWU7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmxvYWRlcigpXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gSWYgSGFtbWVyIGlzbid0IGFjdHVhbGx5IGxvYWRlZCB3aGVuIHRoZSBjdXN0b20gbG9hZGVyIHJlc29sdmVzLCBnaXZlIHVwLlxuICAgICAgICAgICAgaWYgKCEod2luZG93IGFzIGFueSkuSGFtbWVyKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgYFRoZSBjdXN0b20gSEFNTUVSX0xPQURFUiBjb21wbGV0ZWQsIGJ1dCBIYW1tZXIuSlMgaXMgbm90IHByZXNlbnQuYCk7XG4gICAgICAgICAgICAgIGRlcmVnaXN0ZXIgPSAoKSA9PiB7fTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWNhbmNlbFJlZ2lzdHJhdGlvbikge1xuICAgICAgICAgICAgICAvLyBOb3cgdGhhdCBIYW1tZXIgaXMgbG9hZGVkIGFuZCB0aGUgbGlzdGVuZXIgaXMgYmVpbmcgbG9hZGVkIGZvciByZWFsLFxuICAgICAgICAgICAgICAvLyB0aGUgZGVyZWdpc3RyYXRpb24gZnVuY3Rpb24gY2hhbmdlcyBmcm9tIGNhbmNlbGluZyByZWdpc3RyYXRpb24gdG8gcmVtb3ZhbC5cbiAgICAgICAgICAgICAgZGVyZWdpc3RlciA9IHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIGBUaGUgXCIke2V2ZW50TmFtZX1cIiBldmVudCBjYW5ub3QgYmUgYm91bmQgYmVjYXVzZSB0aGUgY3VzdG9tIGAgK1xuICAgICAgICAgICAgICAgIGBIYW1tZXIuSlMgbG9hZGVyIGZhaWxlZC5gKTtcbiAgICAgICAgICAgIGRlcmVnaXN0ZXIgPSAoKSA9PiB7fTtcbiAgICAgICAgICB9KTtcblxuICAgICAgLy8gUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCAqZXhlY3V0ZXMqIGBkZXJlZ2lzdGVyYCAoYW5kIG5vdCBgZGVyZWdpc3RlcmAgaXRzZWxmKSBzbyB0aGF0IHdlXG4gICAgICAvLyBjYW4gY2hhbmdlIHRoZSBiZWhhdmlvciBvZiBgZGVyZWdpc3RlcmAgb25jZSB0aGUgbGlzdGVuZXIgaXMgYWRkZWQuIFVzaW5nIGEgY2xvc3VyZSBpblxuICAgICAgLy8gdGhpcyB3YXkgYWxsb3dzIHVzIHRvIGF2b2lkIGFueSBhZGRpdGlvbmFsIGRhdGEgc3RydWN0dXJlcyB0byB0cmFjayBsaXN0ZW5lciByZW1vdmFsLlxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZGVyZWdpc3RlcigpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAvLyBDcmVhdGluZyB0aGUgbWFuYWdlciBiaW5kIGV2ZW50cywgbXVzdCBiZSBkb25lIG91dHNpZGUgb2YgYW5ndWxhclxuICAgICAgY29uc3QgbWMgPSB0aGlzLl9jb25maWcuYnVpbGRIYW1tZXIoZWxlbWVudCk7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKGV2ZW50T2JqOiBIYW1tZXJJbnB1dCkge1xuICAgICAgICB6b25lLnJ1bkd1YXJkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaGFuZGxlcihldmVudE9iaik7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIG1jLm9uKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgbWMub2ZmKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgICAgICAvLyBkZXN0cm95IG1jIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICAgICAgaWYgKHR5cGVvZiBtYy5kZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbWMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgaXNDdXN0b21FdmVudChldmVudE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jb25maWcuZXZlbnRzLmluZGV4T2YoZXZlbnROYW1lKSA+IC0xO1xuICB9XG59XG5cbi8qKlxuICogSW4gSXZ5LCBzdXBwb3J0IGZvciBIYW1tZXIgZ2VzdHVyZXMgaXMgb3B0aW9uYWwsIHNvIGFwcGxpY2F0aW9ucyBtdXN0XG4gKiBpbXBvcnQgdGhlIGBIYW1tZXJNb2R1bGVgIGF0IHJvb3QgdG8gdHVybiBvbiBzdXBwb3J0LiBUaGlzIG1lYW5zIHRoYXRcbiAqIEhhbW1lci1zcGVjaWZpYyBjb2RlIGNhbiBiZSB0cmVlLXNoYWtlbiBhd2F5IGlmIG5vdCBuZWVkZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBIQU1NRVJfUFJPVklERVJTX19QT1NUX1IzX18gPSBbXTtcblxuLyoqXG4gKiBJbiBWaWV3IEVuZ2luZSwgc3VwcG9ydCBmb3IgSGFtbWVyIGdlc3R1cmVzIGlzIGJ1aWx0LWluIGJ5IGRlZmF1bHQuXG4gKi9cbmV4cG9ydCBjb25zdCBIQU1NRVJfUFJPVklERVJTX19QUkVfUjNfXzogUHJvdmlkZXJbXSA9IFtcbiAge1xuICAgIHByb3ZpZGU6IEVWRU5UX01BTkFHRVJfUExVR0lOUyxcbiAgICB1c2VDbGFzczogSGFtbWVyR2VzdHVyZXNQbHVnaW4sXG4gICAgbXVsdGk6IHRydWUsXG4gICAgZGVwczogW0RPQ1VNRU5ULCBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIENvbnNvbGUsIFtuZXcgT3B0aW9uYWwoKSwgSEFNTUVSX0xPQURFUl1dXG4gIH0sXG4gIHtwcm92aWRlOiBIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHVzZUNsYXNzOiBIYW1tZXJHZXN0dXJlQ29uZmlnLCBkZXBzOiBbXX0sXG5dO1xuXG5leHBvcnQgY29uc3QgSEFNTUVSX1BST1ZJREVSUyA9IEhBTU1FUl9QUk9WSURFUlNfX1BSRV9SM19fO1xuXG4vKipcbiAqIEFkZHMgc3VwcG9ydCBmb3IgSGFtbWVySlMuXG4gKlxuICogSW1wb3J0IHRoaXMgbW9kdWxlIGF0IHRoZSByb290IG9mIHlvdXIgYXBwbGljYXRpb24gc28gdGhhdCBBbmd1bGFyIGNhbiB3b3JrIHdpdGhcbiAqIEhhbW1lckpTIHRvIGRldGVjdCBnZXN0dXJlIGV2ZW50cy5cbiAqXG4gKiBOb3RlIHRoYXQgYXBwbGljYXRpb25zIHN0aWxsIG5lZWQgdG8gaW5jbHVkZSB0aGUgSGFtbWVySlMgc2NyaXB0IGl0c2VsZi4gVGhpcyBtb2R1bGVcbiAqIHNpbXBseSBzZXRzIHVwIHRoZSBjb29yZGluYXRpb24gbGF5ZXIgYmV0d2VlbiBIYW1tZXJKUyBhbmQgQW5ndWxhcidzIEV2ZW50TWFuYWdlci5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7cHJvdmlkZXJzOiBIQU1NRVJfUFJPVklERVJTX19QUkVfUjNfX30pXG5leHBvcnQgY2xhc3MgSGFtbWVyTW9kdWxlIHtcbn1cbiJdfQ==