/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Location, LocationStrategy } from '@angular/common';
import { MockLocationStrategy, SpyLocation } from '@angular/common/testing';
import { Compiler, Injectable, Injector, NgModule, NgModuleFactoryLoader, Optional } from '@angular/core';
import { ChildrenOutletContexts, NoPreloading, PreloadingStrategy, provideRoutes, Router, ROUTER_CONFIGURATION, RouterModule, ROUTES, UrlHandlingStrategy, UrlSerializer, ɵflatten as flatten, ɵROUTER_PROVIDERS as ROUTER_PROVIDERS } from '@angular/router';
/**
 * @description
 *
 * Allows to simulate the loading of ng modules in tests.
 *
 * ```
 * const loader = TestBed.inject(NgModuleFactoryLoader);
 *
 * @Component({template: 'lazy-loaded'})
 * class LazyLoadedComponent {}
 * @NgModule({
 *   declarations: [LazyLoadedComponent],
 *   imports: [RouterModule.forChild([{path: 'loaded', component: LazyLoadedComponent}])]
 * })
 *
 * class LoadedModule {}
 *
 * // sets up stubbedModules
 * loader.stubbedModules = {lazyModule: LoadedModule};
 *
 * router.resetConfig([
 *   {path: 'lazy', loadChildren: 'lazyModule'},
 * ]);
 *
 * router.navigateByUrl('/lazy/loaded');
 * ```
 *
 * @publicApi
 */
import * as ɵngcc0 from '@angular/core';
export class SpyNgModuleFactoryLoader {
    constructor(compiler) {
        this.compiler = compiler;
        /**
         * @docsNotRequired
         */
        this._stubbedModules = {};
    }
    /**
     * @docsNotRequired
     */
    set stubbedModules(modules) {
        const res = {};
        for (const t of Object.keys(modules)) {
            res[t] = this.compiler.compileModuleAsync(modules[t]);
        }
        this._stubbedModules = res;
    }
    /**
     * @docsNotRequired
     */
    get stubbedModules() {
        return this._stubbedModules;
    }
    load(path) {
        if (this._stubbedModules[path]) {
            return this._stubbedModules[path];
        }
        else {
            return Promise.reject(new Error(`Cannot find module ${path}`));
        }
    }
}
SpyNgModuleFactoryLoader.ɵfac = function SpyNgModuleFactoryLoader_Factory(t) { return new (t || SpyNgModuleFactoryLoader)(ɵngcc0.ɵɵinject(ɵngcc0.Compiler)); };
SpyNgModuleFactoryLoader.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: SpyNgModuleFactoryLoader, factory: SpyNgModuleFactoryLoader.ɵfac });
SpyNgModuleFactoryLoader.ctorParameters = () => [
    { type: Compiler }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SpyNgModuleFactoryLoader, [{
        type: Injectable
    }], function () { return [{ type: ɵngcc0.Compiler }]; }, null); })();
function isUrlHandlingStrategy(opts) {
    // This property check is needed because UrlHandlingStrategy is an interface and doesn't exist at
    // runtime.
    return 'shouldProcessUrl' in opts;
}
/**
 * Router setup factory function used for testing.
 *
 * @publicApi
 */
export function setupTestingRouter(urlSerializer, contexts, location, loader, compiler, injector, routes, opts, urlHandlingStrategy) {
    const router = new Router(null, urlSerializer, contexts, location, injector, loader, compiler, flatten(routes));
    if (opts) {
        // Handle deprecated argument ordering.
        if (isUrlHandlingStrategy(opts)) {
            router.urlHandlingStrategy = opts;
        }
        else {
            // Handle ExtraOptions
            if (opts.malformedUriErrorHandler) {
                router.malformedUriErrorHandler = opts.malformedUriErrorHandler;
            }
            if (opts.paramsInheritanceStrategy) {
                router.paramsInheritanceStrategy = opts.paramsInheritanceStrategy;
            }
        }
    }
    if (urlHandlingStrategy) {
        router.urlHandlingStrategy = urlHandlingStrategy;
    }
    return router;
}
/**
 * @description
 *
 * Sets up the router to be used for testing.
 *
 * The modules sets up the router to be used for testing.
 * It provides spy implementations of `Location`, `LocationStrategy`, and {@link
 * NgModuleFactoryLoader}.
 *
 * @usageNotes
 * ### Example
 *
 * ```
 * beforeEach(() => {
 *   TestBed.configureTestingModule({
 *     imports: [
 *       RouterTestingModule.withRoutes(
 *         [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}]
 *       )
 *     ]
 *   });
 * });
 * ```
 *
 * @publicApi
 */
export class RouterTestingModule {
    static withRoutes(routes, config) {
        return {
            ngModule: RouterTestingModule,
            providers: [
                provideRoutes(routes),
                { provide: ROUTER_CONFIGURATION, useValue: config ? config : {} },
            ]
        };
    }
}
RouterTestingModule.ɵmod = ɵngcc0.ɵɵdefineNgModule({ type: RouterTestingModule });
RouterTestingModule.ɵinj = ɵngcc0.ɵɵdefineInjector({ factory: function RouterTestingModule_Factory(t) { return new (t || RouterTestingModule)(); }, providers: [
        ROUTER_PROVIDERS, { provide: Location, useClass: SpyLocation },
        { provide: LocationStrategy, useClass: MockLocationStrategy },
        { provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader }, {
            provide: Router,
            useFactory: setupTestingRouter,
            deps: [
                UrlSerializer, ChildrenOutletContexts, Location, NgModuleFactoryLoader, Compiler, Injector,
                ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()]
            ]
        },
        { provide: PreloadingStrategy, useExisting: NoPreloading }, provideRoutes([])
    ], imports: [RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵngcc0.ɵɵsetNgModuleScope(RouterTestingModule, { exports: function () { return [RouterModule]; } }); })();
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RouterTestingModule, [{
        type: NgModule,
        args: [{
                exports: [RouterModule],
                providers: [
                    ROUTER_PROVIDERS, { provide: Location, useClass: SpyLocation },
                    { provide: LocationStrategy, useClass: MockLocationStrategy },
                    { provide: NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader }, {
                        provide: Router,
                        useFactory: setupTestingRouter,
                        deps: [
                            UrlSerializer, ChildrenOutletContexts, Location, NgModuleFactoryLoader, Compiler, Injector,
                            ROUTES, ROUTER_CONFIGURATION, [UrlHandlingStrategy, new Optional()]
                        ]
                    },
                    { provide: PreloadingStrategy, useExisting: NoPreloading }, provideRoutes([])
                ]
            }]
    }], null, null); })();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Rlc3RpbmdfbW9kdWxlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvdGVzdGluZy9zcmMvcm91dGVyX3Rlc3RpbmdfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFDLG9CQUFvQixFQUFFLFdBQVcsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzFFLE9BQU8sRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFtQixxQkFBcUIsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDOUksT0FBTyxFQUFDLHNCQUFzQixFQUFnQixZQUFZLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxFQUFTLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFVLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxRQUFRLElBQUksT0FBTyxFQUFFLGlCQUFpQixJQUFJLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFJelI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVILE1BQU0sT0FBTyx3QkFBd0I7QUFBRyxJQXdCdEMsWUFBb0IsUUFBa0I7QUFBSSxRQUF0QixhQUFRLEdBQVIsUUFBUSxDQUFVO0FBQUMsUUF2QnZDO0FBQ0Y7QUFFQSxXQURLO0FBQ0wsUUFBVSxvQkFBZSxHQUFvRCxFQUFFLENBQUM7QUFDaEYsSUFtQjJDLENBQUM7QUFDNUMs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bnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvbiwgTG9jYXRpb25TdHJhdGVneX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TW9ja0xvY2F0aW9uU3RyYXRlZ3ksIFNweUxvY2F0aW9ufSBmcm9tICdAYW5ndWxhci9jb21tb24vdGVzdGluZyc7XG5pbXBvcnQge0NvbXBpbGVyLCBJbmplY3RhYmxlLCBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE5nTW9kdWxlRmFjdG9yeSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NoaWxkcmVuT3V0bGV0Q29udGV4dHMsIEV4dHJhT3B0aW9ucywgTm9QcmVsb2FkaW5nLCBQcmVsb2FkaW5nU3RyYXRlZ3ksIHByb3ZpZGVSb3V0ZXMsIFJvdXRlLCBSb3V0ZXIsIFJPVVRFUl9DT05GSUdVUkFUSU9OLCBSb3V0ZXJNb2R1bGUsIFJPVVRFUywgUm91dGVzLCBVcmxIYW5kbGluZ1N0cmF0ZWd5LCBVcmxTZXJpYWxpemVyLCDJtWZsYXR0ZW4gYXMgZmxhdHRlbiwgybVST1VURVJfUFJPVklERVJTIGFzIFJPVVRFUl9QUk9WSURFUlN9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIEFsbG93cyB0byBzaW11bGF0ZSB0aGUgbG9hZGluZyBvZiBuZyBtb2R1bGVzIGluIHRlc3RzLlxuICpcbiAqIGBgYFxuICogY29uc3QgbG9hZGVyID0gVGVzdEJlZC5pbmplY3QoTmdNb2R1bGVGYWN0b3J5TG9hZGVyKTtcbiAqXG4gKiBAQ29tcG9uZW50KHt0ZW1wbGF0ZTogJ2xhenktbG9hZGVkJ30pXG4gKiBjbGFzcyBMYXp5TG9hZGVkQ29tcG9uZW50IHt9XG4gKiBATmdNb2R1bGUoe1xuICogICBkZWNsYXJhdGlvbnM6IFtMYXp5TG9hZGVkQ29tcG9uZW50XSxcbiAqICAgaW1wb3J0czogW1JvdXRlck1vZHVsZS5mb3JDaGlsZChbe3BhdGg6ICdsb2FkZWQnLCBjb21wb25lbnQ6IExhenlMb2FkZWRDb21wb25lbnR9XSldXG4gKiB9KVxuICpcbiAqIGNsYXNzIExvYWRlZE1vZHVsZSB7fVxuICpcbiAqIC8vIHNldHMgdXAgc3R1YmJlZE1vZHVsZXNcbiAqIGxvYWRlci5zdHViYmVkTW9kdWxlcyA9IHtsYXp5TW9kdWxlOiBMb2FkZWRNb2R1bGV9O1xuICpcbiAqIHJvdXRlci5yZXNldENvbmZpZyhbXG4gKiAgIHtwYXRoOiAnbGF6eScsIGxvYWRDaGlsZHJlbjogJ2xhenlNb2R1bGUnfSxcbiAqIF0pO1xuICpcbiAqIHJvdXRlci5uYXZpZ2F0ZUJ5VXJsKCcvbGF6eS9sb2FkZWQnKTtcbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNweU5nTW9kdWxlRmFjdG9yeUxvYWRlciBpbXBsZW1lbnRzIE5nTW9kdWxlRmFjdG9yeUxvYWRlciB7XG4gIC8qKlxuICAgKiBAZG9jc05vdFJlcXVpcmVkXG4gICAqL1xuICBwcml2YXRlIF9zdHViYmVkTW9kdWxlczoge1twYXRoOiBzdHJpbmddOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxhbnk+Pn0gPSB7fTtcblxuICAvKipcbiAgICogQGRvY3NOb3RSZXF1aXJlZFxuICAgKi9cbiAgc2V0IHN0dWJiZWRNb2R1bGVzKG1vZHVsZXM6IHtbcGF0aDogc3RyaW5nXTogYW55fSkge1xuICAgIGNvbnN0IHJlczoge1twYXRoOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgZm9yIChjb25zdCB0IG9mIE9iamVjdC5rZXlzKG1vZHVsZXMpKSB7XG4gICAgICByZXNbdF0gPSB0aGlzLmNvbXBpbGVyLmNvbXBpbGVNb2R1bGVBc3luYyhtb2R1bGVzW3RdKTtcbiAgICB9XG4gICAgdGhpcy5fc3R1YmJlZE1vZHVsZXMgPSByZXM7XG4gIH1cblxuICAvKipcbiAgICogQGRvY3NOb3RSZXF1aXJlZFxuICAgKi9cbiAgZ2V0IHN0dWJiZWRNb2R1bGVzKCk6IHtbcGF0aDogc3RyaW5nXTogYW55fSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0dWJiZWRNb2R1bGVzO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21waWxlcjogQ29tcGlsZXIpIHt9XG5cbiAgbG9hZChwYXRoOiBzdHJpbmcpOiBQcm9taXNlPE5nTW9kdWxlRmFjdG9yeTxhbnk+PiB7XG4gICAgaWYgKHRoaXMuX3N0dWJiZWRNb2R1bGVzW3BhdGhdKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc3R1YmJlZE1vZHVsZXNbcGF0aF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiA8YW55PlByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgbW9kdWxlICR7cGF0aH1gKSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzVXJsSGFuZGxpbmdTdHJhdGVneShvcHRzOiBFeHRyYU9wdGlvbnN8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXJsSGFuZGxpbmdTdHJhdGVneSk6IG9wdHMgaXMgVXJsSGFuZGxpbmdTdHJhdGVneSB7XG4gIC8vIFRoaXMgcHJvcGVydHkgY2hlY2sgaXMgbmVlZGVkIGJlY2F1c2UgVXJsSGFuZGxpbmdTdHJhdGVneSBpcyBhbiBpbnRlcmZhY2UgYW5kIGRvZXNuJ3QgZXhpc3QgYXRcbiAgLy8gcnVudGltZS5cbiAgcmV0dXJuICdzaG91bGRQcm9jZXNzVXJsJyBpbiBvcHRzO1xufVxuXG4vKipcbiAqIFJvdXRlciBzZXR1cCBmYWN0b3J5IGZ1bmN0aW9uIHVzZWQgZm9yIHRlc3RpbmcuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUZXN0aW5nUm91dGVyKFxuICAgIHVybFNlcmlhbGl6ZXI6IFVybFNlcmlhbGl6ZXIsIGNvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLCBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgbG9hZGVyOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIGNvbXBpbGVyOiBDb21waWxlciwgaW5qZWN0b3I6IEluamVjdG9yLCByb3V0ZXM6IFJvdXRlW11bXSxcbiAgICBvcHRzPzogRXh0cmFPcHRpb25zLCB1cmxIYW5kbGluZ1N0cmF0ZWd5PzogVXJsSGFuZGxpbmdTdHJhdGVneSk6IFJvdXRlcjtcblxuLyoqXG4gKiBSb3V0ZXIgc2V0dXAgZmFjdG9yeSBmdW5jdGlvbiB1c2VkIGZvciB0ZXN0aW5nLlxuICpcbiAqIEBkZXByZWNhdGVkIEFzIG9mIHY1LjIuIFRoZSAybmQtdG8tbGFzdCBhcmd1bWVudCBzaG91bGQgYmUgYEV4dHJhT3B0aW9uc2AsIG5vdFxuICogYFVybEhhbmRsaW5nU3RyYXRlZ3lgXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFRlc3RpbmdSb3V0ZXIoXG4gICAgdXJsU2VyaWFsaXplcjogVXJsU2VyaWFsaXplciwgY29udGV4dHM6IENoaWxkcmVuT3V0bGV0Q29udGV4dHMsIGxvY2F0aW9uOiBMb2NhdGlvbixcbiAgICBsb2FkZXI6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgY29tcGlsZXI6IENvbXBpbGVyLCBpbmplY3RvcjogSW5qZWN0b3IsIHJvdXRlczogUm91dGVbXVtdLFxuICAgIHVybEhhbmRsaW5nU3RyYXRlZ3k/OiBVcmxIYW5kbGluZ1N0cmF0ZWd5KTogUm91dGVyO1xuXG4vKipcbiAqIFJvdXRlciBzZXR1cCBmYWN0b3J5IGZ1bmN0aW9uIHVzZWQgZm9yIHRlc3RpbmcuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUZXN0aW5nUm91dGVyKFxuICAgIHVybFNlcmlhbGl6ZXI6IFVybFNlcmlhbGl6ZXIsIGNvbnRleHRzOiBDaGlsZHJlbk91dGxldENvbnRleHRzLCBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgbG9hZGVyOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIGNvbXBpbGVyOiBDb21waWxlciwgaW5qZWN0b3I6IEluamVjdG9yLCByb3V0ZXM6IFJvdXRlW11bXSxcbiAgICBvcHRzPzogRXh0cmFPcHRpb25zfFVybEhhbmRsaW5nU3RyYXRlZ3ksIHVybEhhbmRsaW5nU3RyYXRlZ3k/OiBVcmxIYW5kbGluZ1N0cmF0ZWd5KSB7XG4gIGNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoXG4gICAgICBudWxsISwgdXJsU2VyaWFsaXplciwgY29udGV4dHMsIGxvY2F0aW9uLCBpbmplY3RvciwgbG9hZGVyLCBjb21waWxlciwgZmxhdHRlbihyb3V0ZXMpKTtcbiAgaWYgKG9wdHMpIHtcbiAgICAvLyBIYW5kbGUgZGVwcmVjYXRlZCBhcmd1bWVudCBvcmRlcmluZy5cbiAgICBpZiAoaXNVcmxIYW5kbGluZ1N0cmF0ZWd5KG9wdHMpKSB7XG4gICAgICByb3V0ZXIudXJsSGFuZGxpbmdTdHJhdGVneSA9IG9wdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEhhbmRsZSBFeHRyYU9wdGlvbnNcblxuICAgICAgaWYgKG9wdHMubWFsZm9ybWVkVXJpRXJyb3JIYW5kbGVyKSB7XG4gICAgICAgIHJvdXRlci5tYWxmb3JtZWRVcmlFcnJvckhhbmRsZXIgPSBvcHRzLm1hbGZvcm1lZFVyaUVycm9ySGFuZGxlcjtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMucGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSkge1xuICAgICAgICByb3V0ZXIucGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneSA9IG9wdHMucGFyYW1zSW5oZXJpdGFuY2VTdHJhdGVneTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAodXJsSGFuZGxpbmdTdHJhdGVneSkge1xuICAgIHJvdXRlci51cmxIYW5kbGluZ1N0cmF0ZWd5ID0gdXJsSGFuZGxpbmdTdHJhdGVneTtcbiAgfVxuICByZXR1cm4gcm91dGVyO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFNldHMgdXAgdGhlIHJvdXRlciB0byBiZSB1c2VkIGZvciB0ZXN0aW5nLlxuICpcbiAqIFRoZSBtb2R1bGVzIHNldHMgdXAgdGhlIHJvdXRlciB0byBiZSB1c2VkIGZvciB0ZXN0aW5nLlxuICogSXQgcHJvdmlkZXMgc3B5IGltcGxlbWVudGF0aW9ucyBvZiBgTG9jYXRpb25gLCBgTG9jYXRpb25TdHJhdGVneWAsIGFuZCB7QGxpbmtcbiAqIE5nTW9kdWxlRmFjdG9yeUxvYWRlcn0uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBiZWZvcmVFYWNoKCgpID0+IHtcbiAqICAgVGVzdEJlZC5jb25maWd1cmVUZXN0aW5nTW9kdWxlKHtcbiAqICAgICBpbXBvcnRzOiBbXG4gKiAgICAgICBSb3V0ZXJUZXN0aW5nTW9kdWxlLndpdGhSb3V0ZXMoXG4gKiAgICAgICAgIFt7cGF0aDogJycsIGNvbXBvbmVudDogQmxhbmtDbXB9LCB7cGF0aDogJ3NpbXBsZScsIGNvbXBvbmVudDogU2ltcGxlQ21wfV1cbiAqICAgICAgIClcbiAqICAgICBdXG4gKiAgIH0pO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBOZ01vZHVsZSh7XG4gIGV4cG9ydHM6IFtSb3V0ZXJNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBST1VURVJfUFJPVklERVJTLCB7cHJvdmlkZTogTG9jYXRpb24sIHVzZUNsYXNzOiBTcHlMb2NhdGlvbn0sXG4gICAge3Byb3ZpZGU6IExvY2F0aW9uU3RyYXRlZ3ksIHVzZUNsYXNzOiBNb2NrTG9jYXRpb25TdHJhdGVneX0sXG4gICAge3Byb3ZpZGU6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgdXNlQ2xhc3M6IFNweU5nTW9kdWxlRmFjdG9yeUxvYWRlcn0sIHtcbiAgICAgIHByb3ZpZGU6IFJvdXRlcixcbiAgICAgIHVzZUZhY3Rvcnk6IHNldHVwVGVzdGluZ1JvdXRlcixcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgVXJsU2VyaWFsaXplciwgQ2hpbGRyZW5PdXRsZXRDb250ZXh0cywgTG9jYXRpb24sIE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgQ29tcGlsZXIsIEluamVjdG9yLFxuICAgICAgICBST1VURVMsIFJPVVRFUl9DT05GSUdVUkFUSU9OLCBbVXJsSGFuZGxpbmdTdHJhdGVneSwgbmV3IE9wdGlvbmFsKCldXG4gICAgICBdXG4gICAgfSxcbiAgICB7cHJvdmlkZTogUHJlbG9hZGluZ1N0cmF0ZWd5LCB1c2VFeGlzdGluZzogTm9QcmVsb2FkaW5nfSwgcHJvdmlkZVJvdXRlcyhbXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJUZXN0aW5nTW9kdWxlIHtcbiAgc3RhdGljIHdpdGhSb3V0ZXMocm91dGVzOiBSb3V0ZXMsIGNvbmZpZz86IEV4dHJhT3B0aW9ucyk6XG4gICAgICBNb2R1bGVXaXRoUHJvdmlkZXJzPFJvdXRlclRlc3RpbmdNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFJvdXRlclRlc3RpbmdNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgcHJvdmlkZVJvdXRlcyhyb3V0ZXMpLFxuICAgICAgICB7cHJvdmlkZTogUk9VVEVSX0NPTkZJR1VSQVRJT04sIHVzZVZhbHVlOiBjb25maWcgPyBjb25maWcgOiB7fX0sXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19