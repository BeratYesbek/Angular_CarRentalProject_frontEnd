/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, HostBinding, HostListener, Input, isDevMode, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationEnd } from '../events';
import { Router } from '../router';
import { ActivatedRoute } from '../router_state';
/**
 * @description
 *
 * When applied to an element in a template, makes that element a link
 * that initiates navigation to a route. Navigation opens one or more routed components
 * in one or more `<router-outlet>` locations on the page.
 *
 * Given a route configuration `[{ path: 'user/:name', component: UserCmp }]`,
 * the following creates a static link to the route:
 * `<a routerLink="/user/bob">link to user component</a>`
 *
 * You can use dynamic values to generate the link.
 * For a dynamic link, pass an array of path segments,
 * followed by the params for each segment.
 * For example, `['/team', teamId, 'user', userName, {details: true}]`
 * generates a link to `/team/11/user/bob;details=true`.
 *
 * Multiple static segments can be merged into one term and combined with dynamic segements.
 * For example, `['/team/11/user', userName, {details: true}]`
 *
 * The input that you provide to the link is treated as a delta to the current URL.
 * For instance, suppose the current URL is `/user/(box//aux:team)`.
 * The link `<a [routerLink]="['/user/jim']">Jim</a>` creates the URL
 * `/user/(jim//aux:team)`.
 * See {@link Router#createUrlTree createUrlTree} for more information.
 *
 * @usageNotes
 *
 * You can use absolute or relative paths in a link, set query parameters,
 * control how parameters are handled, and keep a history of navigation states.
 *
 * ### Relative link paths
 *
 * The first segment name can be prepended with `/`, `./`, or `../`.
 * * If the first segment begins with `/`, the router looks up the route from the root of the
 *   app.
 * * If the first segment begins with `./`, or doesn't begin with a slash, the router
 *   looks in the children of the current activated route.
 * * If the first segment begins with `../`, the router goes up one level in the route tree.
 *
 * ### Setting and handling query params and fragments
 *
 * The following link adds a query parameter and a fragment to the generated URL:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
 *   link to user component
 * </a>
 * ```
 * By default, the directive constructs the new URL using the given query parameters.
 * The example generates the link: `/user/bob?debug=true#education`.
 *
 * You can instruct the directive to handle query parameters differently
 * by specifying the `queryParamsHandling` option in the link.
 * Allowed values are:
 *
 *  - `'merge'`: Merge the given `queryParams` into the current query params.
 *  - `'preserve'`: Preserve the current query params.
 *
 * For example:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" queryParamsHandling="merge">
 *   link to user component
 * </a>
 * ```
 *
 * See {@link NavigationExtras.queryParamsHandling NavigationExtras#queryParamsHandling}.
 *
 * ### Preserving navigation history
 *
 * You can provide a `state` value to be persisted to the browser's
 * [`History.state` property](https://developer.mozilla.org/en-US/docs/Web/API/History#Properties).
 * For example:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [state]="{tracingId: 123}">
 *   link to user component
 * </a>
 * ```
 *
 * Use {@link Router.getCurrentNavigation() Router#getCurrentNavigation} to retrieve a saved
 * navigation-state value. For example, to capture the `tracingId` during the `NavigationStart`
 * event:
 *
 * ```
 * // Get NavigationStart events
 * router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
 *   const navigation = router.getCurrentNavigation();
 *   tracingService.trace({id: navigation.extras.state.tracingId});
 * });
 * ```
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export class RouterLink {
    constructor(router, route, tabIndex, renderer, el) {
        this.router = router;
        this.route = route;
        this.commands = [];
        /** @internal */
        this.onChanges = new Subject();
        if (tabIndex == null) {
            renderer.setAttribute(el.nativeElement, 'tabindex', '0');
        }
    }
    /** @nodoc */
    ngOnChanges(changes) {
        // This is subscribed to by `RouterLinkActive` so that it knows to update when there are changes
        // to the RouterLinks it's tracking.
        this.onChanges.next(this);
    }
    /**
     * Commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
     *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
     *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
     *   - **null|undefined**: shorthand for an empty array of commands, i.e. `[]`
     * @see {@link Router#createUrlTree Router#createUrlTree}
     */
    set routerLink(commands) {
        if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
        }
        else {
            this.commands = [];
        }
    }
    /**
     * @deprecated As of Angular v4.0 use `queryParamsHandling` instead.
     */
    set preserveQueryParams(value) {
        if (isDevMode() && console && console.warn) {
            console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
        }
        this.preserve = value;
    }
    /** @nodoc */
    onClick() {
        const extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
            state: this.state,
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return true;
    }
    get urlTree() {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: attrBoolValue(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment),
        });
    }
}
RouterLink.ɵfac = function RouterLink_Factory(t) { return new (t || RouterLink)(ɵngcc0.ɵɵdirectiveInject(Router), ɵngcc0.ɵɵdirectiveInject(ActivatedRoute), ɵngcc0.ɵɵinjectAttribute('tabindex'), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
RouterLink.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: RouterLink, selectors: [["", "routerLink", "", 5, "a", 5, "area"]], hostBindings: function RouterLink_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function RouterLink_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { routerLink: "routerLink", preserveQueryParams: "preserveQueryParams", queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", state: "state" }, features: [ɵngcc0.ɵɵNgOnChangesFeature] });
RouterLink.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: String, decorators: [{ type: Attribute, args: ['tabindex',] }] },
    { type: Renderer2 },
    { type: ElementRef }
];
RouterLink.propDecorators = {
    queryParams: [{ type: Input }],
    fragment: [{ type: Input }],
    queryParamsHandling: [{ type: Input }],
    preserveFragment: [{ type: Input }],
    skipLocationChange: [{ type: Input }],
    replaceUrl: [{ type: Input }],
    state: [{ type: Input }],
    routerLink: [{ type: Input }],
    preserveQueryParams: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RouterLink, [{
        type: Directive,
        args: [{ selector: ':not(a):not(area)[routerLink]' }]
    }], function () { return [{ type: Router }, { type: ActivatedRoute }, { type: String, decorators: [{
                type: Attribute,
                args: ['tabindex']
            }] }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ElementRef }]; }, { routerLink: [{
            type: Input
        }], preserveQueryParams: [{
            type: Input
        }], 
    /** @nodoc */
    onClick: [{
            type: HostListener,
            args: ['click']
        }], queryParams: [{
            type: Input
        }], fragment: [{
            type: Input
        }], queryParamsHandling: [{
            type: Input
        }], preserveFragment: [{
            type: Input
        }], skipLocationChange: [{
            type: Input
        }], replaceUrl: [{
            type: Input
        }], state: [{
            type: Input
        }] }); })();
/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * See `RouterLink` for more information.
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
export class RouterLinkWithHref {
    constructor(router, route, locationStrategy) {
        this.router = router;
        this.route = route;
        this.locationStrategy = locationStrategy;
        this.commands = [];
        /** @internal */
        this.onChanges = new Subject();
        this.subscription = router.events.subscribe((s) => {
            if (s instanceof NavigationEnd) {
                this.updateTargetUrlAndHref();
            }
        });
    }
    /**
     * Commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
     *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
     *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
     *   - **null|undefined**: shorthand for an empty array of commands, i.e. `[]`
     * @see {@link Router#createUrlTree Router#createUrlTree}
     */
    set routerLink(commands) {
        if (commands != null) {
            this.commands = Array.isArray(commands) ? commands : [commands];
        }
        else {
            this.commands = [];
        }
    }
    /**
     * @deprecated As of Angular v4.0 use `queryParamsHandling` instead.
     */
    set preserveQueryParams(value) {
        if (isDevMode() && console && console.warn) {
            console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
        }
        this.preserve = value;
    }
    /** @nodoc */
    ngOnChanges(changes) {
        this.updateTargetUrlAndHref();
        this.onChanges.next(this);
    }
    /** @nodoc */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /** @nodoc */
    onClick(button, ctrlKey, metaKey, shiftKey) {
        if (button !== 0 || ctrlKey || metaKey || shiftKey) {
            return true;
        }
        if (typeof this.target === 'string' && this.target != '_self') {
            return true;
        }
        const extras = {
            skipLocationChange: attrBoolValue(this.skipLocationChange),
            replaceUrl: attrBoolValue(this.replaceUrl),
            state: this.state
        };
        this.router.navigateByUrl(this.urlTree, extras);
        return false;
    }
    updateTargetUrlAndHref() {
        this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
    }
    get urlTree() {
        return this.router.createUrlTree(this.commands, {
            relativeTo: this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            preserveQueryParams: attrBoolValue(this.preserve),
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: attrBoolValue(this.preserveFragment),
        });
    }
}
RouterLinkWithHref.ɵfac = function RouterLinkWithHref_Factory(t) { return new (t || RouterLinkWithHref)(ɵngcc0.ɵɵdirectiveInject(Router), ɵngcc0.ɵɵdirectiveInject(ActivatedRoute), ɵngcc0.ɵɵdirectiveInject(ɵngcc1.LocationStrategy)); };
RouterLinkWithHref.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: RouterLinkWithHref, selectors: [["a", "routerLink", ""], ["area", "routerLink", ""]], hostVars: 2, hostBindings: function RouterLinkWithHref_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("click", function RouterLinkWithHref_click_HostBindingHandler($event) { return ctx.onClick($event.button, $event.ctrlKey, $event.metaKey, $event.shiftKey); });
    } if (rf & 2) {
        ɵngcc0.ɵɵhostProperty("href", ctx.href, ɵngcc0.ɵɵsanitizeUrl);
        ɵngcc0.ɵɵattribute("target", ctx.target);
    } }, inputs: { routerLink: "routerLink", preserveQueryParams: "preserveQueryParams", target: "target", queryParams: "queryParams", fragment: "fragment", queryParamsHandling: "queryParamsHandling", preserveFragment: "preserveFragment", skipLocationChange: "skipLocationChange", replaceUrl: "replaceUrl", state: "state" }, features: [ɵngcc0.ɵɵNgOnChangesFeature] });
RouterLinkWithHref.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute },
    { type: LocationStrategy }
];
RouterLinkWithHref.propDecorators = {
    target: [{ type: HostBinding, args: ['attr.target',] }, { type: Input }],
    queryParams: [{ type: Input }],
    fragment: [{ type: Input }],
    queryParamsHandling: [{ type: Input }],
    preserveFragment: [{ type: Input }],
    skipLocationChange: [{ type: Input }],
    replaceUrl: [{ type: Input }],
    state: [{ type: Input }],
    href: [{ type: HostBinding }],
    routerLink: [{ type: Input }],
    preserveQueryParams: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'],] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RouterLinkWithHref, [{
        type: Directive,
        args: [{ selector: 'a[routerLink],area[routerLink]' }]
    }], function () { return [{ type: Router }, { type: ActivatedRoute }, { type: ɵngcc1.LocationStrategy }]; }, { routerLink: [{
            type: Input
        }], preserveQueryParams: [{
            type: Input
        }], 
    /** @nodoc */
    onClick: [{
            type: HostListener,
            args: ['click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey']]
        }], href: [{
            type: HostBinding
        }], target: [{
            type: HostBinding,
            args: ['attr.target']
        }, {
            type: Input
        }], queryParams: [{
            type: Input
        }], fragment: [{
            type: Input
        }], queryParamsHandling: [{
            type: Input
        }], preserveFragment: [{
            type: Input
        }], skipLocationChange: [{
            type: Input
        }], replaceUrl: [{
            type: Input
        }], state: [{
            type: Input
        }] }); })();
function attrBoolValue(s) {
    return s === '' || !!s;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmsuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3JvdXRlci9zcmMvZGlyZWN0aXZlcy9yb3V0ZXJfbGluay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBd0IsU0FBUyxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUM1SixPQUFPLEVBQUMsT0FBTyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBRzNDLE9BQU8sRUFBUSxhQUFhLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDL0MsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFJL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFFLElBQUksQ0FBQyxRQUFRO0FBQzdCLFlBQU0sbUJBQW1CLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDdkQsWUFBTSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO0FBQ25ELFlBQU0sZ0JBQWdCLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztBQUM1RCxTQUFLLENBQUMsQ0FBQztBQUNQLElBQUUsQ0FBQztBQUNIOzhDQWpKQyxTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsZ0NBQWdDLEVBQUM7Ozs7OztnWEFDbEQ7QUFBQztBQUE0QyxZQTVPMUMsTUFBTTtBQUFJLFlBQ1YsY0FBYztBQUFJLFlBUGxCLGdCQUFnQjtBQUFHO0FBQUc7QUFDWixxQkFtUGYsV0FBVyxTQUFDLGFBQWEsY0FBRyxLQUFLO0FBQUssMEJBT3RDLEtBQUs7QUFBSyx1QkFPVixLQUFLO0FBQUssa0NBT1YsS0FBSztBQUFLLCtCQU9WLEtBQUs7QUFBSyxpQ0FPVixLQUFLO0FBQUsseUJBT1YsS0FBSztBQUFLLG9CQU1WLEtBQUs7QUFBSyxtQkFRVixXQUFXO0FBQUsseUJBc0JoQixLQUFLO0FBQ04sa0NBV0MsS0FBSztBQUNOLHNCQWtCQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDO0FBQzdGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFFO0FBa0NOLFNBQVMsYUFBYSxDQUFDLENBQU07QUFBSSxJQUMvQixPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtMb2NhdGlvblN0cmF0ZWd5fSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtBdHRyaWJ1dGUsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIGlzRGV2TW9kZSwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgU2ltcGxlQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7UXVlcnlQYXJhbXNIYW5kbGluZ30gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCB7RXZlbnQsIE5hdmlnYXRpb25FbmR9IGZyb20gJy4uL2V2ZW50cyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnLi4vcm91dGVyJztcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gJy4uL3JvdXRlcl9zdGF0ZSc7XG5pbXBvcnQge1VybFRyZWV9IGZyb20gJy4uL3VybF90cmVlJztcblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFdoZW4gYXBwbGllZCB0byBhbiBlbGVtZW50IGluIGEgdGVtcGxhdGUsIG1ha2VzIHRoYXQgZWxlbWVudCBhIGxpbmtcbiAqIHRoYXQgaW5pdGlhdGVzIG5hdmlnYXRpb24gdG8gYSByb3V0ZS4gTmF2aWdhdGlvbiBvcGVucyBvbmUgb3IgbW9yZSByb3V0ZWQgY29tcG9uZW50c1xuICogaW4gb25lIG9yIG1vcmUgYDxyb3V0ZXItb3V0bGV0PmAgbG9jYXRpb25zIG9uIHRoZSBwYWdlLlxuICpcbiAqIEdpdmVuIGEgcm91dGUgY29uZmlndXJhdGlvbiBgW3sgcGF0aDogJ3VzZXIvOm5hbWUnLCBjb21wb25lbnQ6IFVzZXJDbXAgfV1gLFxuICogdGhlIGZvbGxvd2luZyBjcmVhdGVzIGEgc3RhdGljIGxpbmsgdG8gdGhlIHJvdXRlOlxuICogYDxhIHJvdXRlckxpbms9XCIvdXNlci9ib2JcIj5saW5rIHRvIHVzZXIgY29tcG9uZW50PC9hPmBcbiAqXG4gKiBZb3UgY2FuIHVzZSBkeW5hbWljIHZhbHVlcyB0byBnZW5lcmF0ZSB0aGUgbGluay5cbiAqIEZvciBhIGR5bmFtaWMgbGluaywgcGFzcyBhbiBhcnJheSBvZiBwYXRoIHNlZ21lbnRzLFxuICogZm9sbG93ZWQgYnkgdGhlIHBhcmFtcyBmb3IgZWFjaCBzZWdtZW50LlxuICogRm9yIGV4YW1wbGUsIGBbJy90ZWFtJywgdGVhbUlkLCAndXNlcicsIHVzZXJOYW1lLCB7ZGV0YWlsczogdHJ1ZX1dYFxuICogZ2VuZXJhdGVzIGEgbGluayB0byBgL3RlYW0vMTEvdXNlci9ib2I7ZGV0YWlscz10cnVlYC5cbiAqXG4gKiBNdWx0aXBsZSBzdGF0aWMgc2VnbWVudHMgY2FuIGJlIG1lcmdlZCBpbnRvIG9uZSB0ZXJtIGFuZCBjb21iaW5lZCB3aXRoIGR5bmFtaWMgc2VnZW1lbnRzLlxuICogRm9yIGV4YW1wbGUsIGBbJy90ZWFtLzExL3VzZXInLCB1c2VyTmFtZSwge2RldGFpbHM6IHRydWV9XWBcbiAqXG4gKiBUaGUgaW5wdXQgdGhhdCB5b3UgcHJvdmlkZSB0byB0aGUgbGluayBpcyB0cmVhdGVkIGFzIGEgZGVsdGEgdG8gdGhlIGN1cnJlbnQgVVJMLlxuICogRm9yIGluc3RhbmNlLCBzdXBwb3NlIHRoZSBjdXJyZW50IFVSTCBpcyBgL3VzZXIvKGJveC8vYXV4OnRlYW0pYC5cbiAqIFRoZSBsaW5rIGA8YSBbcm91dGVyTGlua109XCJbJy91c2VyL2ppbSddXCI+SmltPC9hPmAgY3JlYXRlcyB0aGUgVVJMXG4gKiBgL3VzZXIvKGppbS8vYXV4OnRlYW0pYC5cbiAqIFNlZSB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgY3JlYXRlVXJsVHJlZX0gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiBZb3UgY2FuIHVzZSBhYnNvbHV0ZSBvciByZWxhdGl2ZSBwYXRocyBpbiBhIGxpbmssIHNldCBxdWVyeSBwYXJhbWV0ZXJzLFxuICogY29udHJvbCBob3cgcGFyYW1ldGVycyBhcmUgaGFuZGxlZCwgYW5kIGtlZXAgYSBoaXN0b3J5IG9mIG5hdmlnYXRpb24gc3RhdGVzLlxuICpcbiAqICMjIyBSZWxhdGl2ZSBsaW5rIHBhdGhzXG4gKlxuICogVGhlIGZpcnN0IHNlZ21lbnQgbmFtZSBjYW4gYmUgcHJlcGVuZGVkIHdpdGggYC9gLCBgLi9gLCBvciBgLi4vYC5cbiAqICogSWYgdGhlIGZpcnN0IHNlZ21lbnQgYmVnaW5zIHdpdGggYC9gLCB0aGUgcm91dGVyIGxvb2tzIHVwIHRoZSByb3V0ZSBmcm9tIHRoZSByb290IG9mIHRoZVxuICogICBhcHAuXG4gKiAqIElmIHRoZSBmaXJzdCBzZWdtZW50IGJlZ2lucyB3aXRoIGAuL2AsIG9yIGRvZXNuJ3QgYmVnaW4gd2l0aCBhIHNsYXNoLCB0aGUgcm91dGVyXG4gKiAgIGxvb2tzIGluIHRoZSBjaGlsZHJlbiBvZiB0aGUgY3VycmVudCBhY3RpdmF0ZWQgcm91dGUuXG4gKiAqIElmIHRoZSBmaXJzdCBzZWdtZW50IGJlZ2lucyB3aXRoIGAuLi9gLCB0aGUgcm91dGVyIGdvZXMgdXAgb25lIGxldmVsIGluIHRoZSByb3V0ZSB0cmVlLlxuICpcbiAqICMjIyBTZXR0aW5nIGFuZCBoYW5kbGluZyBxdWVyeSBwYXJhbXMgYW5kIGZyYWdtZW50c1xuICpcbiAqIFRoZSBmb2xsb3dpbmcgbGluayBhZGRzIGEgcXVlcnkgcGFyYW1ldGVyIGFuZCBhIGZyYWdtZW50IHRvIHRoZSBnZW5lcmF0ZWQgVVJMOlxuICpcbiAqIGBgYFxuICogPGEgW3JvdXRlckxpbmtdPVwiWycvdXNlci9ib2InXVwiIFtxdWVyeVBhcmFtc109XCJ7ZGVidWc6IHRydWV9XCIgZnJhZ21lbnQ9XCJlZHVjYXRpb25cIj5cbiAqICAgbGluayB0byB1c2VyIGNvbXBvbmVudFxuICogPC9hPlxuICogYGBgXG4gKiBCeSBkZWZhdWx0LCB0aGUgZGlyZWN0aXZlIGNvbnN0cnVjdHMgdGhlIG5ldyBVUkwgdXNpbmcgdGhlIGdpdmVuIHF1ZXJ5IHBhcmFtZXRlcnMuXG4gKiBUaGUgZXhhbXBsZSBnZW5lcmF0ZXMgdGhlIGxpbms6IGAvdXNlci9ib2I/ZGVidWc9dHJ1ZSNlZHVjYXRpb25gLlxuICpcbiAqIFlvdSBjYW4gaW5zdHJ1Y3QgdGhlIGRpcmVjdGl2ZSB0byBoYW5kbGUgcXVlcnkgcGFyYW1ldGVycyBkaWZmZXJlbnRseVxuICogYnkgc3BlY2lmeWluZyB0aGUgYHF1ZXJ5UGFyYW1zSGFuZGxpbmdgIG9wdGlvbiBpbiB0aGUgbGluay5cbiAqIEFsbG93ZWQgdmFsdWVzIGFyZTpcbiAqXG4gKiAgLSBgJ21lcmdlJ2A6IE1lcmdlIHRoZSBnaXZlbiBgcXVlcnlQYXJhbXNgIGludG8gdGhlIGN1cnJlbnQgcXVlcnkgcGFyYW1zLlxuICogIC0gYCdwcmVzZXJ2ZSdgOiBQcmVzZXJ2ZSB0aGUgY3VycmVudCBxdWVyeSBwYXJhbXMuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiA8YSBbcm91dGVyTGlua109XCJbJy91c2VyL2JvYiddXCIgW3F1ZXJ5UGFyYW1zXT1cIntkZWJ1ZzogdHJ1ZX1cIiBxdWVyeVBhcmFtc0hhbmRsaW5nPVwibWVyZ2VcIj5cbiAqICAgbGluayB0byB1c2VyIGNvbXBvbmVudFxuICogPC9hPlxuICogYGBgXG4gKlxuICogU2VlIHtAbGluayBOYXZpZ2F0aW9uRXh0cmFzLnF1ZXJ5UGFyYW1zSGFuZGxpbmcgTmF2aWdhdGlvbkV4dHJhcyNxdWVyeVBhcmFtc0hhbmRsaW5nfS5cbiAqXG4gKiAjIyMgUHJlc2VydmluZyBuYXZpZ2F0aW9uIGhpc3RvcnlcbiAqXG4gKiBZb3UgY2FuIHByb3ZpZGUgYSBgc3RhdGVgIHZhbHVlIHRvIGJlIHBlcnNpc3RlZCB0byB0aGUgYnJvd3NlcidzXG4gKiBbYEhpc3Rvcnkuc3RhdGVgIHByb3BlcnR5XShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSGlzdG9yeSNQcm9wZXJ0aWVzKS5cbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYFxuICogPGEgW3JvdXRlckxpbmtdPVwiWycvdXNlci9ib2InXVwiIFtzdGF0ZV09XCJ7dHJhY2luZ0lkOiAxMjN9XCI+XG4gKiAgIGxpbmsgdG8gdXNlciBjb21wb25lbnRcbiAqIDwvYT5cbiAqIGBgYFxuICpcbiAqIFVzZSB7QGxpbmsgUm91dGVyLmdldEN1cnJlbnROYXZpZ2F0aW9uKCkgUm91dGVyI2dldEN1cnJlbnROYXZpZ2F0aW9ufSB0byByZXRyaWV2ZSBhIHNhdmVkXG4gKiBuYXZpZ2F0aW9uLXN0YXRlIHZhbHVlLiBGb3IgZXhhbXBsZSwgdG8gY2FwdHVyZSB0aGUgYHRyYWNpbmdJZGAgZHVyaW5nIHRoZSBgTmF2aWdhdGlvblN0YXJ0YFxuICogZXZlbnQ6XG4gKlxuICogYGBgXG4gKiAvLyBHZXQgTmF2aWdhdGlvblN0YXJ0IGV2ZW50c1xuICogcm91dGVyLmV2ZW50cy5waXBlKGZpbHRlcihlID0+IGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpKS5zdWJzY3JpYmUoZSA9PiB7XG4gKiAgIGNvbnN0IG5hdmlnYXRpb24gPSByb3V0ZXIuZ2V0Q3VycmVudE5hdmlnYXRpb24oKTtcbiAqICAgdHJhY2luZ1NlcnZpY2UudHJhY2Uoe2lkOiBuYXZpZ2F0aW9uLmV4dHJhcy5zdGF0ZS50cmFjaW5nSWR9KTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQG5nTW9kdWxlIFJvdXRlck1vZHVsZVxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICc6bm90KGEpOm5vdChhcmVhKVtyb3V0ZXJMaW5rXSd9KVxuZXhwb3J0IGNsYXNzIFJvdXRlckxpbmsgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuICAvKipcbiAgICogUGFzc2VkIHRvIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX0gYXMgcGFydCBvZiB0aGUgYE5hdmlnYXRpb25FeHRyYXNgLlxuICAgKiBAc2VlIHtAbGluayBOYXZpZ2F0aW9uRXh0cmFzI3F1ZXJ5UGFyYW1zIE5hdmlnYXRpb25FeHRyYXMjcXVlcnlQYXJhbXN9XG4gICAqIEBzZWUge0BsaW5rIFJvdXRlciNjcmVhdGVVcmxUcmVlIFJvdXRlciNjcmVhdGVVcmxUcmVlfVxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHF1ZXJ5UGFyYW1zIToge1trOiBzdHJpbmddOiBhbnl9O1xuICAvKipcbiAgICogUGFzc2VkIHRvIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX0gYXMgcGFydCBvZiB0aGUgYE5hdmlnYXRpb25FeHRyYXNgLlxuICAgKiBAc2VlIHtAbGluayBOYXZpZ2F0aW9uRXh0cmFzI2ZyYWdtZW50IE5hdmlnYXRpb25FeHRyYXMjZnJhZ21lbnR9XG4gICAqIEBzZWUge0BsaW5rIFJvdXRlciNjcmVhdGVVcmxUcmVlIFJvdXRlciNjcmVhdGVVcmxUcmVlfVxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIGZyYWdtZW50ITogc3RyaW5nO1xuICAvKipcbiAgICogUGFzc2VkIHRvIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX0gYXMgcGFydCBvZiB0aGUgYE5hdmlnYXRpb25FeHRyYXNgLlxuICAgKiBAc2VlIHtAbGluayBOYXZpZ2F0aW9uRXh0cmFzI3F1ZXJ5UGFyYW1zSGFuZGxpbmcgTmF2aWdhdGlvbkV4dHJhcyNxdWVyeVBhcmFtc0hhbmRsaW5nfVxuICAgKiBAc2VlIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX1cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBxdWVyeVBhcmFtc0hhbmRsaW5nITogUXVlcnlQYXJhbXNIYW5kbGluZztcbiAgLyoqXG4gICAqIFBhc3NlZCB0byB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9IGFzIHBhcnQgb2YgdGhlIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICogQHNlZSB7QGxpbmsgTmF2aWdhdGlvbkV4dHJhcyNwcmVzZXJ2ZUZyYWdtZW50IE5hdmlnYXRpb25FeHRyYXMjcHJlc2VydmVGcmFnbWVudH1cbiAgICogQHNlZSB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9XG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcHJlc2VydmVGcmFnbWVudCE6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBQYXNzZWQgdG8ge0BsaW5rIFJvdXRlciNjcmVhdGVVcmxUcmVlIFJvdXRlciNjcmVhdGVVcmxUcmVlfSBhcyBwYXJ0IG9mIHRoZSBgTmF2aWdhdGlvbkV4dHJhc2AuXG4gICAqIEBzZWUge0BsaW5rIE5hdmlnYXRpb25FeHRyYXMjc2tpcExvY2F0aW9uQ2hhbmdlIE5hdmlnYXRpb25FeHRyYXMjc2tpcExvY2F0aW9uQ2hhbmdlfVxuICAgKiBAc2VlIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX1cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBza2lwTG9jYXRpb25DaGFuZ2UhOiBib29sZWFuO1xuICAvKipcbiAgICogUGFzc2VkIHRvIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX0gYXMgcGFydCBvZiB0aGUgYE5hdmlnYXRpb25FeHRyYXNgLlxuICAgKiBAc2VlIHtAbGluayBOYXZpZ2F0aW9uRXh0cmFzI3JlcGxhY2VVcmwgTmF2aWdhdGlvbkV4dHJhcyNyZXBsYWNlVXJsfVxuICAgKiBAc2VlIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX1cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSByZXBsYWNlVXJsITogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFBhc3NlZCB0byB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9IGFzIHBhcnQgb2YgdGhlIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICogQHNlZSB7QGxpbmsgTmF2aWdhdGlvbkV4dHJhcyNzdGF0ZSBOYXZpZ2F0aW9uRXh0cmFzI3N0YXRlfVxuICAgKiBAc2VlIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX1cbiAgICovXG4gIEBJbnB1dCgpIHN0YXRlPzoge1trOiBzdHJpbmddOiBhbnl9O1xuICBwcml2YXRlIGNvbW1hbmRzOiBhbnlbXSA9IFtdO1xuICBwcml2YXRlIHByZXNlcnZlITogYm9vbGVhbjtcblxuICAvKiogQGludGVybmFsICovXG4gIG9uQ2hhbmdlcyA9IG5ldyBTdWJqZWN0PFJvdXRlckxpbms+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgIEBBdHRyaWJ1dGUoJ3RhYmluZGV4JykgdGFiSW5kZXg6IHN0cmluZywgcmVuZGVyZXI6IFJlbmRlcmVyMiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBpZiAodGFiSW5kZXggPT0gbnVsbCkge1xuICAgICAgcmVuZGVyZXIuc2V0QXR0cmlidXRlKGVsLm5hdGl2ZUVsZW1lbnQsICd0YWJpbmRleCcsICcwJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBub2RvYyAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgLy8gVGhpcyBpcyBzdWJzY3JpYmVkIHRvIGJ5IGBSb3V0ZXJMaW5rQWN0aXZlYCBzbyB0aGF0IGl0IGtub3dzIHRvIHVwZGF0ZSB3aGVuIHRoZXJlIGFyZSBjaGFuZ2VzXG4gICAgLy8gdG8gdGhlIFJvdXRlckxpbmtzIGl0J3MgdHJhY2tpbmcuXG4gICAgdGhpcy5vbkNoYW5nZXMubmV4dCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21tYW5kcyB0byBwYXNzIHRvIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX0uXG4gICAqICAgLSAqKmFycmF5Kio6IGNvbW1hbmRzIHRvIHBhc3MgdG8ge0BsaW5rIFJvdXRlciNjcmVhdGVVcmxUcmVlIFJvdXRlciNjcmVhdGVVcmxUcmVlfS5cbiAgICogICAtICoqc3RyaW5nKio6IHNob3J0aGFuZCBmb3IgYXJyYXkgb2YgY29tbWFuZHMgd2l0aCBqdXN0IHRoZSBzdHJpbmcsIGkuZS4gYFsnL3JvdXRlJ11gXG4gICAqICAgLSAqKm51bGx8dW5kZWZpbmVkKio6IHNob3J0aGFuZCBmb3IgYW4gZW1wdHkgYXJyYXkgb2YgY29tbWFuZHMsIGkuZS4gYFtdYFxuICAgKiBAc2VlIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX1cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCByb3V0ZXJMaW5rKGNvbW1hbmRzOiBhbnlbXXxzdHJpbmd8bnVsbHx1bmRlZmluZWQpIHtcbiAgICBpZiAoY29tbWFuZHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21tYW5kcyA9IEFycmF5LmlzQXJyYXkoY29tbWFuZHMpID8gY29tbWFuZHMgOiBbY29tbWFuZHNdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbW1hbmRzID0gW107XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIEFzIG9mIEFuZ3VsYXIgdjQuMCB1c2UgYHF1ZXJ5UGFyYW1zSGFuZGxpbmdgIGluc3RlYWQuXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgcHJlc2VydmVRdWVyeVBhcmFtcyh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmIChpc0Rldk1vZGUoKSAmJiA8YW55PmNvbnNvbGUgJiYgPGFueT5jb25zb2xlLndhcm4pIHtcbiAgICAgIGNvbnNvbGUud2FybigncHJlc2VydmVRdWVyeVBhcmFtcyBpcyBkZXByZWNhdGVkISwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIEBub2RvYyAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZXh0cmFzID0ge1xuICAgICAgc2tpcExvY2F0aW9uQ2hhbmdlOiBhdHRyQm9vbFZhbHVlKHRoaXMuc2tpcExvY2F0aW9uQ2hhbmdlKSxcbiAgICAgIHJlcGxhY2VVcmw6IGF0dHJCb29sVmFsdWUodGhpcy5yZXBsYWNlVXJsKSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgIH07XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLnVybFRyZWUsIGV4dHJhcyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXQgdXJsVHJlZSgpOiBVcmxUcmVlIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxuICAgICAgcXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcbiAgICAgIHByZXNlcnZlUXVlcnlQYXJhbXM6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZSksXG4gICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiB0aGlzLnF1ZXJ5UGFyYW1zSGFuZGxpbmcsXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudCksXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBMZXRzIHlvdSBsaW5rIHRvIHNwZWNpZmljIHJvdXRlcyBpbiB5b3VyIGFwcC5cbiAqXG4gKiBTZWUgYFJvdXRlckxpbmtgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICpcbiAqIEBuZ01vZHVsZSBSb3V0ZXJNb2R1bGVcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnYVtyb3V0ZXJMaW5rXSxhcmVhW3JvdXRlckxpbmtdJ30pXG5leHBvcnQgY2xhc3MgUm91dGVyTGlua1dpdGhIcmVmIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnRhcmdldCcpIEBJbnB1dCgpIHRhcmdldCE6IHN0cmluZztcbiAgLyoqXG4gICAqIFBhc3NlZCB0byB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9IGFzIHBhcnQgb2YgdGhlIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICogQHNlZSB7QGxpbmsgTmF2aWdhdGlvbkV4dHJhcyNxdWVyeVBhcmFtcyBOYXZpZ2F0aW9uRXh0cmFzI3F1ZXJ5UGFyYW1zfVxuICAgKiBAc2VlIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX1cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBxdWVyeVBhcmFtcyE6IHtbazogc3RyaW5nXTogYW55fTtcbiAgLyoqXG4gICAqIFBhc3NlZCB0byB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9IGFzIHBhcnQgb2YgdGhlIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICogQHNlZSB7QGxpbmsgTmF2aWdhdGlvbkV4dHJhcyNmcmFnbWVudCBOYXZpZ2F0aW9uRXh0cmFzI2ZyYWdtZW50fVxuICAgKiBAc2VlIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX1cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBmcmFnbWVudCE6IHN0cmluZztcbiAgLyoqXG4gICAqIFBhc3NlZCB0byB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9IGFzIHBhcnQgb2YgdGhlIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICogQHNlZSB7QGxpbmsgTmF2aWdhdGlvbkV4dHJhcyNxdWVyeVBhcmFtc0hhbmRsaW5nIE5hdmlnYXRpb25FeHRyYXMjcXVlcnlQYXJhbXNIYW5kbGluZ31cbiAgICogQHNlZSB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9XG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcXVlcnlQYXJhbXNIYW5kbGluZyE6IFF1ZXJ5UGFyYW1zSGFuZGxpbmc7XG4gIC8qKlxuICAgKiBQYXNzZWQgdG8ge0BsaW5rIFJvdXRlciNjcmVhdGVVcmxUcmVlIFJvdXRlciNjcmVhdGVVcmxUcmVlfSBhcyBwYXJ0IG9mIHRoZSBgTmF2aWdhdGlvbkV4dHJhc2AuXG4gICAqIEBzZWUge0BsaW5rIE5hdmlnYXRpb25FeHRyYXMjcHJlc2VydmVGcmFnbWVudCBOYXZpZ2F0aW9uRXh0cmFzI3ByZXNlcnZlRnJhZ21lbnR9XG4gICAqIEBzZWUge0BsaW5rIFJvdXRlciNjcmVhdGVVcmxUcmVlIFJvdXRlciNjcmVhdGVVcmxUcmVlfVxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgpIHByZXNlcnZlRnJhZ21lbnQhOiBib29sZWFuO1xuICAvKipcbiAgICogUGFzc2VkIHRvIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX0gYXMgcGFydCBvZiB0aGUgYE5hdmlnYXRpb25FeHRyYXNgLlxuICAgKiBAc2VlIHtAbGluayBOYXZpZ2F0aW9uRXh0cmFzI3NraXBMb2NhdGlvbkNoYW5nZSBOYXZpZ2F0aW9uRXh0cmFzI3NraXBMb2NhdGlvbkNoYW5nZX1cbiAgICogQHNlZSB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9XG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgc2tpcExvY2F0aW9uQ2hhbmdlITogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFBhc3NlZCB0byB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9IGFzIHBhcnQgb2YgdGhlIGBOYXZpZ2F0aW9uRXh0cmFzYC5cbiAgICogQHNlZSB7QGxpbmsgTmF2aWdhdGlvbkV4dHJhcyNyZXBsYWNlVXJsIE5hdmlnYXRpb25FeHRyYXMjcmVwbGFjZVVybH1cbiAgICogQHNlZSB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9XG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgcmVwbGFjZVVybCE6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBQYXNzZWQgdG8ge0BsaW5rIFJvdXRlciNjcmVhdGVVcmxUcmVlIFJvdXRlciNjcmVhdGVVcmxUcmVlfSBhcyBwYXJ0IG9mIHRoZSBgTmF2aWdhdGlvbkV4dHJhc2AuXG4gICAqIEBzZWUge0BsaW5rIE5hdmlnYXRpb25FeHRyYXMjc3RhdGUgTmF2aWdhdGlvbkV4dHJhcyNzdGF0ZX1cbiAgICogQHNlZSB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9XG4gICAqL1xuICBASW5wdXQoKSBzdGF0ZT86IHtbazogc3RyaW5nXTogYW55fTtcbiAgcHJpdmF0ZSBjb21tYW5kczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgcHJlc2VydmUhOiBib29sZWFuO1xuXG4gIC8vIHRoZSB1cmwgZGlzcGxheWVkIG9uIHRoZSBhbmNob3IgZWxlbWVudC5cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBIb3N0QmluZGluZygpIGhyZWYhOiBzdHJpbmc7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBvbkNoYW5nZXMgPSBuZXcgU3ViamVjdDxSb3V0ZXJMaW5rV2l0aEhyZWY+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgIHByaXZhdGUgbG9jYXRpb25TdHJhdGVneTogTG9jYXRpb25TdHJhdGVneSkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gcm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKHM6IEV2ZW50KSA9PiB7XG4gICAgICBpZiAocyBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUYXJnZXRVcmxBbmRIcmVmKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tbWFuZHMgdG8gcGFzcyB0byB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9LlxuICAgKiAgIC0gKiphcnJheSoqOiBjb21tYW5kcyB0byBwYXNzIHRvIHtAbGluayBSb3V0ZXIjY3JlYXRlVXJsVHJlZSBSb3V0ZXIjY3JlYXRlVXJsVHJlZX0uXG4gICAqICAgLSAqKnN0cmluZyoqOiBzaG9ydGhhbmQgZm9yIGFycmF5IG9mIGNvbW1hbmRzIHdpdGgganVzdCB0aGUgc3RyaW5nLCBpLmUuIGBbJy9yb3V0ZSddYFxuICAgKiAgIC0gKipudWxsfHVuZGVmaW5lZCoqOiBzaG9ydGhhbmQgZm9yIGFuIGVtcHR5IGFycmF5IG9mIGNvbW1hbmRzLCBpLmUuIGBbXWBcbiAgICogQHNlZSB7QGxpbmsgUm91dGVyI2NyZWF0ZVVybFRyZWUgUm91dGVyI2NyZWF0ZVVybFRyZWV9XG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgcm91dGVyTGluayhjb21tYW5kczogYW55W118c3RyaW5nfG51bGx8dW5kZWZpbmVkKSB7XG4gICAgaWYgKGNvbW1hbmRzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuY29tbWFuZHMgPSBBcnJheS5pc0FycmF5KGNvbW1hbmRzKSA/IGNvbW1hbmRzIDogW2NvbW1hbmRzXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb21tYW5kcyA9IFtdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBBcyBvZiBBbmd1bGFyIHY0LjAgdXNlIGBxdWVyeVBhcmFtc0hhbmRsaW5nYCBpbnN0ZWFkLlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHByZXNlcnZlUXVlcnlQYXJhbXModmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAoaXNEZXZNb2RlKCkgJiYgPGFueT5jb25zb2xlICYmIDxhbnk+Y29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ3ByZXNlcnZlUXVlcnlQYXJhbXMgaXMgZGVwcmVjYXRlZCwgdXNlIHF1ZXJ5UGFyYW1zSGFuZGxpbmcgaW5zdGVhZC4nKTtcbiAgICB9XG4gICAgdGhpcy5wcmVzZXJ2ZSA9IHZhbHVlO1xuICB9XG5cbiAgLyoqIEBub2RvYyAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogYW55IHtcbiAgICB0aGlzLnVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTtcbiAgICB0aGlzLm9uQ2hhbmdlcy5uZXh0KHRoaXMpO1xuICB9XG4gIC8qKiBAbm9kb2MgKi9cbiAgbmdPbkRlc3Ryb3koKTogYW55IHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqIEBub2RvYyAqL1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50LmJ1dHRvbicsICckZXZlbnQuY3RybEtleScsICckZXZlbnQubWV0YUtleScsICckZXZlbnQuc2hpZnRLZXknXSlcbiAgb25DbGljayhidXR0b246IG51bWJlciwgY3RybEtleTogYm9vbGVhbiwgbWV0YUtleTogYm9vbGVhbiwgc2hpZnRLZXk6IGJvb2xlYW4pOiBib29sZWFuIHtcbiAgICBpZiAoYnV0dG9uICE9PSAwIHx8IGN0cmxLZXkgfHwgbWV0YUtleSB8fCBzaGlmdEtleSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3N0cmluZycgJiYgdGhpcy50YXJnZXQgIT0gJ19zZWxmJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgZXh0cmFzID0ge1xuICAgICAgc2tpcExvY2F0aW9uQ2hhbmdlOiBhdHRyQm9vbFZhbHVlKHRoaXMuc2tpcExvY2F0aW9uQ2hhbmdlKSxcbiAgICAgIHJlcGxhY2VVcmw6IGF0dHJCb29sVmFsdWUodGhpcy5yZXBsYWNlVXJsKSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlXG4gICAgfTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMudXJsVHJlZSwgZXh0cmFzKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRhcmdldFVybEFuZEhyZWYoKTogdm9pZCB7XG4gICAgdGhpcy5ocmVmID0gdGhpcy5sb2NhdGlvblN0cmF0ZWd5LnByZXBhcmVFeHRlcm5hbFVybCh0aGlzLnJvdXRlci5zZXJpYWxpemVVcmwodGhpcy51cmxUcmVlKSk7XG4gIH1cblxuICBnZXQgdXJsVHJlZSgpOiBVcmxUcmVlIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZSh0aGlzLmNvbW1hbmRzLCB7XG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxuICAgICAgcXVlcnlQYXJhbXM6IHRoaXMucXVlcnlQYXJhbXMsXG4gICAgICBmcmFnbWVudDogdGhpcy5mcmFnbWVudCxcbiAgICAgIHByZXNlcnZlUXVlcnlQYXJhbXM6IGF0dHJCb29sVmFsdWUodGhpcy5wcmVzZXJ2ZSksXG4gICAgICBxdWVyeVBhcmFtc0hhbmRsaW5nOiB0aGlzLnF1ZXJ5UGFyYW1zSGFuZGxpbmcsXG4gICAgICBwcmVzZXJ2ZUZyYWdtZW50OiBhdHRyQm9vbFZhbHVlKHRoaXMucHJlc2VydmVGcmFnbWVudCksXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXR0ckJvb2xWYWx1ZShzOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHMgPT09ICcnIHx8ICEhcztcbn1cbiJdfQ==