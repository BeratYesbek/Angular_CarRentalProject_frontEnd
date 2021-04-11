/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, ContentChildren, Directive, ElementRef, Input, Optional, QueryList, Renderer2 } from '@angular/core';
import { from, of } from 'rxjs';
import { mergeAll } from 'rxjs/operators';
import { NavigationEnd } from '../events';
import { Router } from '../router';
import { RouterLink, RouterLinkWithHref } from './router_link';
/**
 *
 * @description
 *
 * Tracks whether the linked route of an element is currently active, and allows you
 * to specify one or more CSS classes to add to the element when the linked route
 * is active.
 *
 * Use this directive to create a visual distinction for elements associated with an active route.
 * For example, the following code highlights the word "Bob" when the the router
 * activates the associated route:
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
 * ```
 *
 * Whenever the URL is either '/user' or '/user/bob', the "active-link" class is
 * added to the anchor tag. If the URL changes, the class is removed.
 *
 * You can set more than one class using a space-separated string or an array.
 * For example:
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="class1 class2">Bob</a>
 * <a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
 * ```
 *
 * To add the classes only when the URL matches the link exactly, add the option `exact: true`:
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:
 * true}">Bob</a>
 * ```
 *
 * To directly check the `isActive` status of the link, assign the `RouterLinkActive`
 * instance to a template variable.
 * For example, the following checks the status without assigning any CSS classes:
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive #rla="routerLinkActive">
 *   Bob {{ rla.isActive ? '(already open)' : ''}}
 * </a>
 * ```
 *
 * You can apply the `RouterLinkActive` directive to an ancestor of linked elements.
 * For example, the following sets the active-link class on the `<div>`  parent tag
 * when the URL is either '/user/jim' or '/user/bob'.
 *
 * ```
 * <div routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
 *   <a routerLink="/user/jim">Jim</a>
 *   <a routerLink="/user/bob">Bob</a>
 * </div>
 * ```
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
import * as ɵngcc0 from '@angular/core';
export class RouterLinkActive {
    constructor(router, element, renderer, cdr, link, linkWithHref) {
        this.router = router;
        this.element = element;
        this.renderer = renderer;
        this.cdr = cdr;
        this.link = link;
        this.linkWithHref = linkWithHref;
        this.classes = [];
        this.isActive = false;
        this.routerLinkActiveOptions = { exact: false };
        this.routerEventsSubscription = router.events.subscribe((s) => {
            if (s instanceof NavigationEnd) {
                this.update();
            }
        });
    }
    /** @nodoc */
    ngAfterContentInit() {
        // `of(null)` is used to force subscribe body to execute once immediately (like `startWith`).
        from([this.links.changes, this.linksWithHrefs.changes, of(null)])
            .pipe(mergeAll())
            .subscribe(_ => {
            this.update();
            this.subscribeToEachLinkOnChanges();
        });
    }
    subscribeToEachLinkOnChanges() {
        var _a;
        (_a = this.linkInputChangesSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        const allLinkChanges = [...this.links.toArray(), ...this.linksWithHrefs.toArray(), this.link, this.linkWithHref]
            .filter((link) => !!link)
            .map(link => link.onChanges);
        this.linkInputChangesSubscription = from(allLinkChanges).pipe(mergeAll()).subscribe(link => {
            if (this.isActive !== this.isLinkActive(this.router)(link)) {
                this.update();
            }
        });
    }
    set routerLinkActive(data) {
        const classes = Array.isArray(data) ? data : data.split(' ');
        this.classes = classes.filter(c => !!c);
    }
    /** @nodoc */
    ngOnChanges(changes) {
        this.update();
    }
    /** @nodoc */
    ngOnDestroy() {
        var _a;
        this.routerEventsSubscription.unsubscribe();
        (_a = this.linkInputChangesSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    update() {
        if (!this.links || !this.linksWithHrefs || !this.router.navigated)
            return;
        Promise.resolve().then(() => {
            const hasActiveLinks = this.hasActiveLinks();
            if (this.isActive !== hasActiveLinks) {
                this.isActive = hasActiveLinks;
                this.cdr.markForCheck();
                this.classes.forEach((c) => {
                    if (hasActiveLinks) {
                        this.renderer.addClass(this.element.nativeElement, c);
                    }
                    else {
                        this.renderer.removeClass(this.element.nativeElement, c);
                    }
                });
            }
        });
    }
    isLinkActive(router) {
        return (link) => router.isActive(link.urlTree, this.routerLinkActiveOptions.exact);
    }
    hasActiveLinks() {
        const isActiveCheckFn = this.isLinkActive(this.router);
        return this.link && isActiveCheckFn(this.link) ||
            this.linkWithHref && isActiveCheckFn(this.linkWithHref) ||
            this.links.some(isActiveCheckFn) || this.linksWithHrefs.some(isActiveCheckFn);
    }
}
RouterLinkActive.ɵfac = function RouterLinkActive_Factory(t) { return new (t || RouterLinkActive)(ɵngcc0.ɵɵdirectiveInject(Router), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ChangeDetectorRef), ɵngcc0.ɵɵdirectiveInject(RouterLink, 8), ɵngcc0.ɵɵdirectiveInject(RouterLinkWithHref, 8)); };
RouterLinkActive.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: RouterLinkActive, selectors: [["", "routerLinkActive", ""]], contentQueries: function RouterLinkActive_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵngcc0.ɵɵcontentQuery(dirIndex, RouterLink, true);
        ɵngcc0.ɵɵcontentQuery(dirIndex, RouterLinkWithHref, true);
    } if (rf & 2) {
        var _t;
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.links = _t);
        ɵngcc0.ɵɵqueryRefresh(_t = ɵngcc0.ɵɵloadQuery()) && (ctx.linksWithHrefs = _t);
    } }, inputs: { routerLinkActiveOptions: "routerLinkActiveOptions", routerLinkActive: "routerLinkActive" }, exportAs: ["routerLinkActive"], features: [ɵngcc0.ɵɵNgOnChangesFeature] });
RouterLinkActive.ctorParameters = () => [
    { type: Router },
    { type: ElementRef },
    { type: Renderer2 },
    { type: ChangeDetectorRef },
    { type: RouterLink, decorators: [{ type: Optional }] },
    { type: RouterLinkWithHref, decorators: [{ type: Optional }] }
];
RouterLinkActive.propDecorators = {
    links: [{ type: ContentChildren, args: [RouterLink, { descendants: true },] }],
    linksWithHrefs: [{ type: ContentChildren, args: [RouterLinkWithHref, { descendants: true },] }],
    routerLinkActiveOptions: [{ type: Input }],
    routerLinkActive: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RouterLinkActive, [{
        type: Directive,
        args: [{
                selector: '[routerLinkActive]',
                exportAs: 'routerLinkActive'
            }]
    }], function () { return [{ type: Router }, { type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ChangeDetectorRef }, { type: RouterLink, decorators: [{
                type: Optional
            }] }, { type: RouterLinkWithHref, decorators: [{
                type: Optional
            }] }]; }, { routerLinkActiveOptions: [{
            type: Input
        }], routerLinkActive: [{
            type: Input
        }], links: [{
            type: ContentChildren,
            args: [RouterLink, { descendants: true }]
        }], linksWithHrefs: [{
            type: ContentChildren,
            args: [RouterLinkWithHref, { descendants: true }]
        }] }); })();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmtfYWN0aXZlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvc3JjL2RpcmVjdGl2ZXMvcm91dGVyX2xpbmtfYWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFFSCxPQUFPLEVBQW1CLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBd0IsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBQ3RMLE9BQU8sRUFBQyxJQUFJLEVBQUUsRUFBRSxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzVDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQVEsYUFBYSxFQUFDLE1BQU0sV0FBVyxDQUFDO0FBQy9DLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFFakMsT0FBTyxFQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUc3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBS0gsTUFBTSxPQUFPLGdCQUFnQjtBQUFHLElBWTlCLFlBQ1ksTUFBYyxFQUFVLE9BQW1CLEVBQVUs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QkFDdEQsZUFBZSxTQUFDLGtCQUFrQixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQztBQUNyRCxzQ0FPRixLQUFLO0FBQUssK0JBcUNWLEtBQUs7QUFDUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29CQUFFO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7ZnJvbSwgb2YsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21lcmdlQWxsfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7RXZlbnQsIE5hdmlnYXRpb25FbmR9IGZyb20gJy4uL2V2ZW50cyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnLi4vcm91dGVyJztcblxuaW1wb3J0IHtSb3V0ZXJMaW5rLCBSb3V0ZXJMaW5rV2l0aEhyZWZ9IGZyb20gJy4vcm91dGVyX2xpbmsnO1xuXG5cbi8qKlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRyYWNrcyB3aGV0aGVyIHRoZSBsaW5rZWQgcm91dGUgb2YgYW4gZWxlbWVudCBpcyBjdXJyZW50bHkgYWN0aXZlLCBhbmQgYWxsb3dzIHlvdVxuICogdG8gc3BlY2lmeSBvbmUgb3IgbW9yZSBDU1MgY2xhc3NlcyB0byBhZGQgdG8gdGhlIGVsZW1lbnQgd2hlbiB0aGUgbGlua2VkIHJvdXRlXG4gKiBpcyBhY3RpdmUuXG4gKlxuICogVXNlIHRoaXMgZGlyZWN0aXZlIHRvIGNyZWF0ZSBhIHZpc3VhbCBkaXN0aW5jdGlvbiBmb3IgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGFuIGFjdGl2ZSByb3V0ZS5cbiAqIEZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIGNvZGUgaGlnaGxpZ2h0cyB0aGUgd29yZCBcIkJvYlwiIHdoZW4gdGhlIHRoZSByb3V0ZXJcbiAqIGFjdGl2YXRlcyB0aGUgYXNzb2NpYXRlZCByb3V0ZTpcbiAqXG4gKiBgYGBcbiAqIDxhIHJvdXRlckxpbms9XCIvdXNlci9ib2JcIiByb3V0ZXJMaW5rQWN0aXZlPVwiYWN0aXZlLWxpbmtcIj5Cb2I8L2E+XG4gKiBgYGBcbiAqXG4gKiBXaGVuZXZlciB0aGUgVVJMIGlzIGVpdGhlciAnL3VzZXInIG9yICcvdXNlci9ib2InLCB0aGUgXCJhY3RpdmUtbGlua1wiIGNsYXNzIGlzXG4gKiBhZGRlZCB0byB0aGUgYW5jaG9yIHRhZy4gSWYgdGhlIFVSTCBjaGFuZ2VzLCB0aGUgY2xhc3MgaXMgcmVtb3ZlZC5cbiAqXG4gKiBZb3UgY2FuIHNldCBtb3JlIHRoYW4gb25lIGNsYXNzIHVzaW5nIGEgc3BhY2Utc2VwYXJhdGVkIHN0cmluZyBvciBhbiBhcnJheS5cbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYFxuICogPGEgcm91dGVyTGluaz1cIi91c2VyL2JvYlwiIHJvdXRlckxpbmtBY3RpdmU9XCJjbGFzczEgY2xhc3MyXCI+Qm9iPC9hPlxuICogPGEgcm91dGVyTGluaz1cIi91c2VyL2JvYlwiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIlsnY2xhc3MxJywgJ2NsYXNzMiddXCI+Qm9iPC9hPlxuICogYGBgXG4gKlxuICogVG8gYWRkIHRoZSBjbGFzc2VzIG9ubHkgd2hlbiB0aGUgVVJMIG1hdGNoZXMgdGhlIGxpbmsgZXhhY3RseSwgYWRkIHRoZSBvcHRpb24gYGV4YWN0OiB0cnVlYDpcbiAqXG4gKiBgYGBcbiAqIDxhIHJvdXRlckxpbms9XCIvdXNlci9ib2JcIiByb3V0ZXJMaW5rQWN0aXZlPVwiYWN0aXZlLWxpbmtcIiBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwie2V4YWN0OlxuICogdHJ1ZX1cIj5Cb2I8L2E+XG4gKiBgYGBcbiAqXG4gKiBUbyBkaXJlY3RseSBjaGVjayB0aGUgYGlzQWN0aXZlYCBzdGF0dXMgb2YgdGhlIGxpbmssIGFzc2lnbiB0aGUgYFJvdXRlckxpbmtBY3RpdmVgXG4gKiBpbnN0YW5jZSB0byBhIHRlbXBsYXRlIHZhcmlhYmxlLlxuICogRm9yIGV4YW1wbGUsIHRoZSBmb2xsb3dpbmcgY2hlY2tzIHRoZSBzdGF0dXMgd2l0aG91dCBhc3NpZ25pbmcgYW55IENTUyBjbGFzc2VzOlxuICpcbiAqIGBgYFxuICogPGEgcm91dGVyTGluaz1cIi91c2VyL2JvYlwiIHJvdXRlckxpbmtBY3RpdmUgI3JsYT1cInJvdXRlckxpbmtBY3RpdmVcIj5cbiAqICAgQm9iIHt7IHJsYS5pc0FjdGl2ZSA/ICcoYWxyZWFkeSBvcGVuKScgOiAnJ319XG4gKiA8L2E+XG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFwcGx5IHRoZSBgUm91dGVyTGlua0FjdGl2ZWAgZGlyZWN0aXZlIHRvIGFuIGFuY2VzdG9yIG9mIGxpbmtlZCBlbGVtZW50cy5cbiAqIEZvciBleGFtcGxlLCB0aGUgZm9sbG93aW5nIHNldHMgdGhlIGFjdGl2ZS1saW5rIGNsYXNzIG9uIHRoZSBgPGRpdj5gICBwYXJlbnQgdGFnXG4gKiB3aGVuIHRoZSBVUkwgaXMgZWl0aGVyICcvdXNlci9qaW0nIG9yICcvdXNlci9ib2InLlxuICpcbiAqIGBgYFxuICogPGRpdiByb3V0ZXJMaW5rQWN0aXZlPVwiYWN0aXZlLWxpbmtcIiBbcm91dGVyTGlua0FjdGl2ZU9wdGlvbnNdPVwie2V4YWN0OiB0cnVlfVwiPlxuICogICA8YSByb3V0ZXJMaW5rPVwiL3VzZXIvamltXCI+SmltPC9hPlxuICogICA8YSByb3V0ZXJMaW5rPVwiL3VzZXIvYm9iXCI+Qm9iPC9hPlxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBAbmdNb2R1bGUgUm91dGVyTW9kdWxlXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcm91dGVyTGlua0FjdGl2ZV0nLFxuICBleHBvcnRBczogJ3JvdXRlckxpbmtBY3RpdmUnLFxufSlcbmV4cG9ydCBjbGFzcyBSb3V0ZXJMaW5rQWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIEFmdGVyQ29udGVudEluaXQge1xuICBAQ29udGVudENoaWxkcmVuKFJvdXRlckxpbmssIHtkZXNjZW5kYW50czogdHJ1ZX0pIGxpbmtzITogUXVlcnlMaXN0PFJvdXRlckxpbms+O1xuICBAQ29udGVudENoaWxkcmVuKFJvdXRlckxpbmtXaXRoSHJlZiwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgbGlua3NXaXRoSHJlZnMhOiBRdWVyeUxpc3Q8Um91dGVyTGlua1dpdGhIcmVmPjtcblxuICBwcml2YXRlIGNsYXNzZXM6IHN0cmluZ1tdID0gW107XG4gIHByaXZhdGUgcm91dGVyRXZlbnRzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgbGlua0lucHV0Q2hhbmdlc1N1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIHJlYWRvbmx5IGlzQWN0aXZlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcm91dGVyTGlua0FjdGl2ZU9wdGlvbnM6IHtleGFjdDogYm9vbGVhbn0gPSB7ZXhhY3Q6IGZhbHNlfTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgICAgcHJpdmF0ZSByZWFkb25seSBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBAT3B0aW9uYWwoKSBwcml2YXRlIGxpbms/OiBSb3V0ZXJMaW5rLFxuICAgICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSBsaW5rV2l0aEhyZWY/OiBSb3V0ZXJMaW5rV2l0aEhyZWYpIHtcbiAgICB0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbiA9IHJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChzOiBFdmVudCkgPT4ge1xuICAgICAgaWYgKHMgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogQG5vZG9jICovXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICAvLyBgb2YobnVsbClgIGlzIHVzZWQgdG8gZm9yY2Ugc3Vic2NyaWJlIGJvZHkgdG8gZXhlY3V0ZSBvbmNlIGltbWVkaWF0ZWx5IChsaWtlIGBzdGFydFdpdGhgKS5cbiAgICBmcm9tKFt0aGlzLmxpbmtzLmNoYW5nZXMsIHRoaXMubGlua3NXaXRoSHJlZnMuY2hhbmdlcywgb2YobnVsbCldKVxuICAgICAgICAucGlwZShtZXJnZUFsbCgpKVxuICAgICAgICAuc3Vic2NyaWJlKF8gPT4ge1xuICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVUb0VhY2hMaW5rT25DaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0VhY2hMaW5rT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubGlua0lucHV0Q2hhbmdlc1N1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgICBjb25zdCBhbGxMaW5rQ2hhbmdlcyA9XG4gICAgICAgIFsuLi50aGlzLmxpbmtzLnRvQXJyYXkoKSwgLi4udGhpcy5saW5rc1dpdGhIcmVmcy50b0FycmF5KCksIHRoaXMubGluaywgdGhpcy5saW5rV2l0aEhyZWZdXG4gICAgICAgICAgICAuZmlsdGVyKChsaW5rKTogbGluayBpcyBSb3V0ZXJMaW5rfFJvdXRlckxpbmtXaXRoSHJlZiA9PiAhIWxpbmspXG4gICAgICAgICAgICAubWFwKGxpbmsgPT4gbGluay5vbkNoYW5nZXMpO1xuICAgIHRoaXMubGlua0lucHV0Q2hhbmdlc1N1YnNjcmlwdGlvbiA9IGZyb20oYWxsTGlua0NoYW5nZXMpLnBpcGUobWVyZ2VBbGwoKSkuc3Vic2NyaWJlKGxpbmsgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNBY3RpdmUgIT09IHRoaXMuaXNMaW5rQWN0aXZlKHRoaXMucm91dGVyKShsaW5rKSkge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHJvdXRlckxpbmtBY3RpdmUoZGF0YTogc3RyaW5nW118c3RyaW5nKSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IEFycmF5LmlzQXJyYXkoZGF0YSkgPyBkYXRhIDogZGF0YS5zcGxpdCgnICcpO1xuICAgIHRoaXMuY2xhc3NlcyA9IGNsYXNzZXMuZmlsdGVyKGMgPT4gISFjKTtcbiAgfVxuXG4gIC8qKiBAbm9kb2MgKi9cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cbiAgLyoqIEBub2RvYyAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlckV2ZW50c1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMubGlua0lucHV0Q2hhbmdlc1N1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5saW5rcyB8fCAhdGhpcy5saW5rc1dpdGhIcmVmcyB8fCAhdGhpcy5yb3V0ZXIubmF2aWdhdGVkKSByZXR1cm47XG4gICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICBjb25zdCBoYXNBY3RpdmVMaW5rcyA9IHRoaXMuaGFzQWN0aXZlTGlua3MoKTtcbiAgICAgIGlmICh0aGlzLmlzQWN0aXZlICE9PSBoYXNBY3RpdmVMaW5rcykge1xuICAgICAgICAodGhpcyBhcyBhbnkpLmlzQWN0aXZlID0gaGFzQWN0aXZlTGlua3M7XG4gICAgICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB0aGlzLmNsYXNzZXMuZm9yRWFjaCgoYykgPT4ge1xuICAgICAgICAgIGlmIChoYXNBY3RpdmVMaW5rcykge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgYyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIGMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGlzTGlua0FjdGl2ZShyb3V0ZXI6IFJvdXRlcik6IChsaW5rOiAoUm91dGVyTGlua3xSb3V0ZXJMaW5rV2l0aEhyZWYpKSA9PiBib29sZWFuIHtcbiAgICByZXR1cm4gKGxpbms6IFJvdXRlckxpbmt8Um91dGVyTGlua1dpdGhIcmVmKSA9PlxuICAgICAgICAgICAgICAgcm91dGVyLmlzQWN0aXZlKGxpbmsudXJsVHJlZSwgdGhpcy5yb3V0ZXJMaW5rQWN0aXZlT3B0aW9ucy5leGFjdCk7XG4gIH1cblxuICBwcml2YXRlIGhhc0FjdGl2ZUxpbmtzKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzQWN0aXZlQ2hlY2tGbiA9IHRoaXMuaXNMaW5rQWN0aXZlKHRoaXMucm91dGVyKTtcbiAgICByZXR1cm4gdGhpcy5saW5rICYmIGlzQWN0aXZlQ2hlY2tGbih0aGlzLmxpbmspIHx8XG4gICAgICAgIHRoaXMubGlua1dpdGhIcmVmICYmIGlzQWN0aXZlQ2hlY2tGbih0aGlzLmxpbmtXaXRoSHJlZikgfHxcbiAgICAgICAgdGhpcy5saW5rcy5zb21lKGlzQWN0aXZlQ2hlY2tGbikgfHwgdGhpcy5saW5rc1dpdGhIcmVmcy5zb21lKGlzQWN0aXZlQ2hlY2tGbik7XG4gIH1cbn1cbiJdfQ==