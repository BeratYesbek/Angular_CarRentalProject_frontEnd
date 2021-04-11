/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Scroll } from './events';
import { Router } from './router';
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/common';
export class RouterScroller {
    constructor(router, 
    /** @docsNotRequired */ viewportScroller, options = {}) {
        this.router = router;
        this.viewportScroller = viewportScroller;
        this.options = options;
        this.lastId = 0;
        this.lastSource = 'imperative';
        this.restoredId = 0;
        this.store = {};
        // Default both options to 'disabled'
        options.scrollPositionRestoration = options.scrollPositionRestoration || 'disabled';
        options.anchorScrolling = options.anchorScrolling || 'disabled';
    }
    init() {
        // we want to disable the automatic scrolling because having two places
        // responsible for scrolling results race conditions, especially given
        // that browser don't implement this behavior consistently
        if (this.options.scrollPositionRestoration !== 'disabled') {
            this.viewportScroller.setHistoryScrollRestoration('manual');
        }
        this.routerEventsSubscription = this.createScrollEvents();
        this.scrollEventsSubscription = this.consumeScrollEvents();
    }
    createScrollEvents() {
        return this.router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                // store the scroll position of the current stable navigations.
                this.store[this.lastId] = this.viewportScroller.getScrollPosition();
                this.lastSource = e.navigationTrigger;
                this.restoredId = e.restoredState ? e.restoredState.navigationId : 0;
            }
            else if (e instanceof NavigationEnd) {
                this.lastId = e.id;
                this.scheduleScrollEvent(e, this.router.parseUrl(e.urlAfterRedirects).fragment);
            }
        });
    }
    consumeScrollEvents() {
        return this.router.events.subscribe(e => {
            if (!(e instanceof Scroll))
                return;
            // a popstate event. The pop state event will always ignore anchor scrolling.
            if (e.position) {
                if (this.options.scrollPositionRestoration === 'top') {
                    this.viewportScroller.scrollToPosition([0, 0]);
                }
                else if (this.options.scrollPositionRestoration === 'enabled') {
                    this.viewportScroller.scrollToPosition(e.position);
                }
                // imperative navigation "forward"
            }
            else {
                if (e.anchor && this.options.anchorScrolling === 'enabled') {
                    this.viewportScroller.scrollToAnchor(e.anchor);
                }
                else if (this.options.scrollPositionRestoration !== 'disabled') {
                    this.viewportScroller.scrollToPosition([0, 0]);
                }
            }
        });
    }
    scheduleScrollEvent(routerEvent, anchor) {
        this.router.triggerEvent(new Scroll(routerEvent, this.lastSource === 'popstate' ? this.store[this.restoredId] : null, anchor));
    }
    /** @nodoc */
    ngOnDestroy() {
        if (this.routerEventsSubscription) {
            this.routerEventsSubscription.unsubscribe();
        }
        if (this.scrollEventsSubscription) {
            this.scrollEventsSubscription.unsubscribe();
        }
    }
}
RouterScroller.ɵfac = function RouterScroller_Factory(t) { return new (t || RouterScroller)(ɵngcc0.ɵɵinject(Router), ɵngcc0.ɵɵinject(ɵngcc1.ViewportScroller), ɵngcc0.ɵɵinject(undefined)); };
RouterScroller.ɵprov = ɵngcc0.ɵɵdefineInjectable({ token: RouterScroller, factory: RouterScroller.ɵfac });
RouterScroller.ctorParameters = () => [
    { type: Router },
    { type: ViewportScroller },
    { type: undefined }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(RouterScroller, [{
        type: Injectable
    }], function () { return [{ type: Router }, { type: ɵngcc1.ViewportScroller }, { type: undefined }]; }, null); })();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Njcm9sbGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvc3JjL3JvdXRlcl9zY3JvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUdwRCxPQUFPLEVBQUMsYUFBYSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEUsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQzs7O0FBR2hDLE1BQU0sT0FBTyxjQUFjO0FBQUcsSUFXNUIsWUFDWSxNQUFjO0FBQzNCLElBQUssdUJBQXVCLENBQWlCLGdCQUFrQyxFQUFVLFVBR2hGLEVBQUU7QUFDWixRQUxjLFdBQU0sR0FBTixNQUFNLENBQVE7QUFBQyxRQUNpQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO0FBQUMsUUFBUyxZQUFPLEdBQVAsT0FBTyxDQUdyRjtBQUFDLFFBVkgsV0FBTSxHQUFHLENBQUMsQ0FBQztBQUNyQixRQUFVLGVBQVUsR0FBbUQsWUFBWSxDQUFDO0FBQ3BGLFFBQVUsZUFBVSxHQUFHLENBQUMsQ0FBQztBQUN6QixRQUFVLFVBQUssR0FBc0MsRUFBRSxDQUFDO0FBQ3hELFFBT0kscUNBQXFDO0FBQ3pDLFFBQUksT0FBTyxDQUFDLHlCQUF5QixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsSUFBSSxVQUFVLENBQUM7QUFDeEYsUUFBSSxPQUFPLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLElBQUksVUFBVSxDQUFDO0FBQ3BFLElBQUUsQ0FBQztBQUNILElBQ0UsSUFBSTtBQUFLLFFBQ1AsdUVBQXVFO0FBQzNFLFFBQUksc0VBQXNFO0FBQzFFLFFBQUksMERB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QUFJLENBQUMsQ0FBQyxDQUFDO0FBQ1AsSUFBRSxDQUFDO0FBQ0gsSUFDVSxtQkFBbUIsQ0FBQyxXQUEwQixFQUFFLE1BQW1CO0FBQUksUUFDN0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxNQUFNLENBQy9CLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ25HLElBQUUsQ0FBQztBQUNILElBQ0UsYUFBYTtBQUNmLElBQUUsV0FBVztBQUNiLFFBQUksSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7QUFDdkMsWUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbEQsU0FBSztBQUNMLFFBQUksSUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7QUFDdkMsWUFBTSxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbEQsU0FBSztBQUNMLElBQUUsQ0FBQztBQUNIOzBDQW5GQyxVQUFVOzBHQUNUO0FBQUM7QUFBd0MsWUFIbkMsTUFBTTtBQUFJLFlBTFYsZ0JBQWdCO0FBQUk7QUFDMUI7Ozt3SEFBRTtBQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Vmlld3BvcnRTY3JvbGxlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VW5zdWJzY3JpYmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge05hdmlnYXRpb25FbmQsIE5hdmlnYXRpb25TdGFydCwgU2Nyb2xsfSBmcm9tICcuL2V2ZW50cyc7XG5pbXBvcnQge1JvdXRlcn0gZnJvbSAnLi9yb3V0ZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm91dGVyU2Nyb2xsZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgcHJpdmF0ZSByb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24hOiBVbnN1YnNjcmliYWJsZTtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIHByaXZhdGUgc2Nyb2xsRXZlbnRzU3Vic2NyaXB0aW9uITogVW5zdWJzY3JpYmFibGU7XG5cbiAgcHJpdmF0ZSBsYXN0SWQgPSAwO1xuICBwcml2YXRlIGxhc3RTb3VyY2U6ICdpbXBlcmF0aXZlJ3wncG9wc3RhdGUnfCdoYXNoY2hhbmdlJ3x1bmRlZmluZWQgPSAnaW1wZXJhdGl2ZSc7XG4gIHByaXZhdGUgcmVzdG9yZWRJZCA9IDA7XG4gIHByaXZhdGUgc3RvcmU6IHtba2V5OiBzdHJpbmddOiBbbnVtYmVyLCBudW1iZXJdfSA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICAgIC8qKiBAZG9jc05vdFJlcXVpcmVkICovIHB1YmxpYyByZWFkb25seSB2aWV3cG9ydFNjcm9sbGVyOiBWaWV3cG9ydFNjcm9sbGVyLCBwcml2YXRlIG9wdGlvbnM6IHtcbiAgICAgICAgc2Nyb2xsUG9zaXRpb25SZXN0b3JhdGlvbj86ICdkaXNhYmxlZCd8J2VuYWJsZWQnfCd0b3AnLFxuICAgICAgICBhbmNob3JTY3JvbGxpbmc/OiAnZGlzYWJsZWQnfCdlbmFibGVkJ1xuICAgICAgfSA9IHt9KSB7XG4gICAgLy8gRGVmYXVsdCBib3RoIG9wdGlvbnMgdG8gJ2Rpc2FibGVkJ1xuICAgIG9wdGlvbnMuc2Nyb2xsUG9zaXRpb25SZXN0b3JhdGlvbiA9IG9wdGlvbnMuc2Nyb2xsUG9zaXRpb25SZXN0b3JhdGlvbiB8fCAnZGlzYWJsZWQnO1xuICAgIG9wdGlvbnMuYW5jaG9yU2Nyb2xsaW5nID0gb3B0aW9ucy5hbmNob3JTY3JvbGxpbmcgfHwgJ2Rpc2FibGVkJztcbiAgfVxuXG4gIGluaXQoKTogdm9pZCB7XG4gICAgLy8gd2Ugd2FudCB0byBkaXNhYmxlIHRoZSBhdXRvbWF0aWMgc2Nyb2xsaW5nIGJlY2F1c2UgaGF2aW5nIHR3byBwbGFjZXNcbiAgICAvLyByZXNwb25zaWJsZSBmb3Igc2Nyb2xsaW5nIHJlc3VsdHMgcmFjZSBjb25kaXRpb25zLCBlc3BlY2lhbGx5IGdpdmVuXG4gICAgLy8gdGhhdCBicm93c2VyIGRvbid0IGltcGxlbWVudCB0aGlzIGJlaGF2aW9yIGNvbnNpc3RlbnRseVxuICAgIGlmICh0aGlzLm9wdGlvbnMuc2Nyb2xsUG9zaXRpb25SZXN0b3JhdGlvbiAhPT0gJ2Rpc2FibGVkJykge1xuICAgICAgdGhpcy52aWV3cG9ydFNjcm9sbGVyLnNldEhpc3RvcnlTY3JvbGxSZXN0b3JhdGlvbignbWFudWFsJyk7XG4gICAgfVxuICAgIHRoaXMucm91dGVyRXZlbnRzU3Vic2NyaXB0aW9uID0gdGhpcy5jcmVhdGVTY3JvbGxFdmVudHMoKTtcbiAgICB0aGlzLnNjcm9sbEV2ZW50c1N1YnNjcmlwdGlvbiA9IHRoaXMuY29uc3VtZVNjcm9sbEV2ZW50cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTY3JvbGxFdmVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoZSA9PiB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuICAgICAgICAvLyBzdG9yZSB0aGUgc2Nyb2xsIHBvc2l0aW9uIG9mIHRoZSBjdXJyZW50IHN0YWJsZSBuYXZpZ2F0aW9ucy5cbiAgICAgICAgdGhpcy5zdG9yZVt0aGlzLmxhc3RJZF0gPSB0aGlzLnZpZXdwb3J0U2Nyb2xsZXIuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5sYXN0U291cmNlID0gZS5uYXZpZ2F0aW9uVHJpZ2dlcjtcbiAgICAgICAgdGhpcy5yZXN0b3JlZElkID0gZS5yZXN0b3JlZFN0YXRlID8gZS5yZXN0b3JlZFN0YXRlLm5hdmlnYXRpb25JZCA6IDA7XG4gICAgICB9IGVsc2UgaWYgKGUgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSB7XG4gICAgICAgIHRoaXMubGFzdElkID0gZS5pZDtcbiAgICAgICAgdGhpcy5zY2hlZHVsZVNjcm9sbEV2ZW50KGUsIHRoaXMucm91dGVyLnBhcnNlVXJsKGUudXJsQWZ0ZXJSZWRpcmVjdHMpLmZyYWdtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY29uc3VtZVNjcm9sbEV2ZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShlID0+IHtcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBTY3JvbGwpKSByZXR1cm47XG4gICAgICAvLyBhIHBvcHN0YXRlIGV2ZW50LiBUaGUgcG9wIHN0YXRlIGV2ZW50IHdpbGwgYWx3YXlzIGlnbm9yZSBhbmNob3Igc2Nyb2xsaW5nLlxuICAgICAgaWYgKGUucG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5zY3JvbGxQb3NpdGlvblJlc3RvcmF0aW9uID09PSAndG9wJykge1xuICAgICAgICAgIHRoaXMudmlld3BvcnRTY3JvbGxlci5zY3JvbGxUb1Bvc2l0aW9uKFswLCAwXSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnNjcm9sbFBvc2l0aW9uUmVzdG9yYXRpb24gPT09ICdlbmFibGVkJykge1xuICAgICAgICAgIHRoaXMudmlld3BvcnRTY3JvbGxlci5zY3JvbGxUb1Bvc2l0aW9uKGUucG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGltcGVyYXRpdmUgbmF2aWdhdGlvbiBcImZvcndhcmRcIlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGUuYW5jaG9yICYmIHRoaXMub3B0aW9ucy5hbmNob3JTY3JvbGxpbmcgPT09ICdlbmFibGVkJykge1xuICAgICAgICAgIHRoaXMudmlld3BvcnRTY3JvbGxlci5zY3JvbGxUb0FuY2hvcihlLmFuY2hvcik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLnNjcm9sbFBvc2l0aW9uUmVzdG9yYXRpb24gIT09ICdkaXNhYmxlZCcpIHtcbiAgICAgICAgICB0aGlzLnZpZXdwb3J0U2Nyb2xsZXIuc2Nyb2xsVG9Qb3NpdGlvbihbMCwgMF0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNjaGVkdWxlU2Nyb2xsRXZlbnQocm91dGVyRXZlbnQ6IE5hdmlnYXRpb25FbmQsIGFuY2hvcjogc3RyaW5nfG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci50cmlnZ2VyRXZlbnQobmV3IFNjcm9sbChcbiAgICAgICAgcm91dGVyRXZlbnQsIHRoaXMubGFzdFNvdXJjZSA9PT0gJ3BvcHN0YXRlJyA/IHRoaXMuc3RvcmVbdGhpcy5yZXN0b3JlZElkXSA6IG51bGwsIGFuY2hvcikpO1xuICB9XG5cbiAgLyoqIEBub2RvYyAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5yb3V0ZXJFdmVudHNTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMucm91dGVyRXZlbnRzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNjcm9sbEV2ZW50c1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zY3JvbGxFdmVudHNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==