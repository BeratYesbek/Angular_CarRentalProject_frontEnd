/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DOCUMENT, ɵgetDOM as getDOM } from '@angular/common';
import { Inject, Injectable, ɵɵinject } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Factory to create a `Meta` service instance for the current DOM document.
 */
import * as ɵngcc0 from '@angular/core';
export function createMeta() {
    return new Meta(ɵɵinject(DOCUMENT));
}
/**
 * A service for managing HTML `<meta>` tags.
 *
 * Properties of the `MetaDefinition` object match the attributes of the
 * HTML `<meta>` tag. These tags define document metadata that is important for
 * things like configuring a Content Security Policy, defining browser compatibility
 * and security settings, setting HTTP Headers, defining rich content for social sharing,
 * and Search Engine Optimization (SEO).
 *
 * To identify specific `<meta>` tags in a document, use an attribute selection
 * string in the format `"tag_attribute='value string'"`.
 * For example, an `attrSelector` value of `"name='description'"` matches a tag
 * whose `name` attribute has the value `"description"`.
 * Selectors are used with the `querySelector()` Document method,
 * in the format `meta[{attrSelector}]`.
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 * @see [Document.querySelector()](https://developer.mozilla.org/docs/Web/API/Document/querySelector)
 *
 *
 * @publicApi
 */
export class Meta {
    constructor(_doc) {
        this._doc = _doc;
        this._dom = getDOM();
    }
    /**
     * Retrieves or creates a specific `<meta>` tag element in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * If an existing element is found, it is returned and is not modified in any way.
     * @param tag The definition of a `<meta>` element to match or create.
     * @param forceCreation True to create a new element without checking whether one already exists.
     * @returns The existing element with the same attributes and values if found,
     * the new element if no match is found, or `null` if the tag parameter is not defined.
     */
    addTag(tag, forceCreation = false) {
        if (!tag)
            return null;
        return this._getOrCreateElement(tag, forceCreation);
    }
    /**
     * Retrieves or creates a set of `<meta>` tag elements in the current HTML document.
     * In searching for an existing tag, Angular attempts to match the `name` or `property` attribute
     * values in the provided tag definition, and verifies that all other attribute values are equal.
     * @param tags An array of tag definitions to match or create.
     * @param forceCreation True to create new elements without checking whether they already exist.
     * @returns The matching elements if found, or the new elements.
     */
    addTags(tags, forceCreation = false) {
        if (!tags)
            return [];
        return tags.reduce((result, tag) => {
            if (tag) {
                result.push(this._getOrCreateElement(tag, forceCreation));
            }
            return result;
        }, []);
    }
    /**
     * Retrieves a `<meta>` tag element in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching element, if any.
     */
    getTag(attrSelector) {
        if (!attrSelector)
            return null;
        return this._doc.querySelector(`meta[${attrSelector}]`) || null;
    }
    /**
     * Retrieves a set of `<meta>` tag elements in the current HTML document.
     * @param attrSelector The tag attribute and value to match against, in the format
     * `"tag_attribute='value string'"`.
     * @returns The matching elements, if any.
     */
    getTags(attrSelector) {
        if (!attrSelector)
            return [];
        const list /*NodeList*/ = this._doc.querySelectorAll(`meta[${attrSelector}]`);
        return list ? [].slice.call(list) : [];
    }
    /**
     * Modifies an existing `<meta>` tag element in the current HTML document.
     * @param tag The tag description with which to replace the existing tag content.
     * @param selector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     * If not supplied, matches a tag with the same `name` or `property` attribute value as the
     * replacement tag.
     * @return The modified element.
     */
    updateTag(tag, selector) {
        if (!tag)
            return null;
        selector = selector || this._parseSelector(tag);
        const meta = this.getTag(selector);
        if (meta) {
            return this._setMetaElementAttributes(tag, meta);
        }
        return this._getOrCreateElement(tag, true);
    }
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param attrSelector A tag attribute and value to match against, to identify
     * an existing tag. A string in the format `"tag_attribute=`value string`"`.
     */
    removeTag(attrSelector) {
        this.removeTagElement(this.getTag(attrSelector));
    }
    /**
     * Removes an existing `<meta>` tag element from the current HTML document.
     * @param meta The tag definition to match against to identify an existing tag.
     */
    removeTagElement(meta) {
        if (meta) {
            this._dom.remove(meta);
        }
    }
    _getOrCreateElement(meta, forceCreation = false) {
        if (!forceCreation) {
            const selector = this._parseSelector(meta);
            const elem = this.getTag(selector);
            // It's allowed to have multiple elements with the same name so it's not enough to
            // just check that element with the same name already present on the page. We also need to
            // check if element has tag attributes
            if (elem && this._containsAttributes(meta, elem))
                return elem;
        }
        const element = this._dom.createElement('meta');
        this._setMetaElementAttributes(meta, element);
        const head = this._doc.getElementsByTagName('head')[0];
        head.appendChild(element);
        return element;
    }
    _setMetaElementAttributes(tag, el) {
        Object.keys(tag).forEach((prop) => el.setAttribute(prop, tag[prop]));
        return el;
    }
    _parseSelector(tag) {
        const attr = tag.name ? 'name' : 'property';
        return `${attr}="${tag[attr]}"`;
    }
    _containsAttributes(tag, elem) {
        return Object.keys(tag).every((key) => elem.getAttribute(key) === tag[key]);
    }
}
Meta.ɵfac = function Meta_Factory(t) { return new (t || Meta)(ɵngcc0.ɵɵinject(DOCUMENT)); };
Meta.ɵprov = i0.ɵɵdefineInjectable({ factory: createMeta, token: Meta, providedIn: "root" });
Meta.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(Meta, [{
        type: Injectable,
        args: [{ providedIn: 'root', useFactory: createMeta, deps: [] }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci9tZXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUE2QixPQUFPLElBQUksTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkYsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNEO0FBeUJBO0FBQ0E7QUFDQSxHQUFHOztBQUNILE1BQU0sVUFBVSxVQUFVO0FBQzFCLElBQUUsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUVILE1BQU0sT0FBTyxJQUFJO0FBQ2pCLElBQ0UsWUFBc0MsSUFBUztBQUNqRCxRQUR3QyxTQUFJLEdBQUosSUFBSSxDQUFLO0FBQUMsUUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUN6QixJQUFFLENBQUM7QUFDSCxJQUFFO0FBQ0Y7QUFDRTtBQUNFO0FBQ0U7QUFDRTtBQUNFO0FBQ0U7QUFDRTtBQUVKLE9BREw7QUFDTCxJQUFFLE1BQU0sQ0FBQyxHQUFtQixFQUFFLGdCQUF5QixLQUFLO0FBQUksUUFDNUQsSUFBSSxDQUFDLEdBQUc7QUFBRSxZQUFBLE9BQU8sSUFBSSxDQUFDO0FBQzFCLFFBQUksT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3hELElBQUUsQ0FB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LENBQUMsVUFBVSxDQUFDO0FBQ3hELFFBQUksT0FBTyxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNwQyxJQUFFLENBQUM7QUFDSCxJQUNVLG1CQUFtQixDQUFDLEdBQW1CLEVBQUUsSUFBcUI7QUFBSSxRQUN4RSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3hGLElBQUUsQ0FBQztBQUNIOzRGQUFDO0FBQ0QsNkZBbElLO0FBQUM7RUFETCxVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLHpFQUUvQyw0Q0FDRCxNQUFNLFNBQUMsUUFBUTtBQUhtQyxFQUFDLEZBRzVCOzs7Ozs7O2tDQUFFO0FBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtET0NVTUVOVCwgybVEb21BZGFwdGVyIGFzIERvbUFkYXB0ZXIsIMm1Z2V0RE9NIGFzIGdldERPTX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCDJtcm1aW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBhdHRyaWJ1dGVzIG9mIGFuIEhUTUwgYDxtZXRhPmAgZWxlbWVudC4gVGhlIGVsZW1lbnQgaXRzZWxmIGlzXG4gKiByZXByZXNlbnRlZCBieSB0aGUgaW50ZXJuYWwgYEhUTUxNZXRhRWxlbWVudGAuXG4gKlxuICogQHNlZSBbSFRNTCBtZXRhIHRhZ10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZG9jcy9XZWIvSFRNTC9FbGVtZW50L21ldGEpXG4gKiBAc2VlIGBNZXRhYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IHR5cGUgTWV0YURlZmluaXRpb24gPSB7XG4gIGNoYXJzZXQ/OiBzdHJpbmc7XG4gIGNvbnRlbnQ/OiBzdHJpbmc7XG4gIGh0dHBFcXVpdj86IHN0cmluZztcbiAgaWQ/OiBzdHJpbmc7XG4gIGl0ZW1wcm9wPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBwcm9wZXJ0eT86IHN0cmluZztcbiAgc2NoZW1lPzogc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG59JntcbiAgLy8gVE9ETyhJZ29yTWluYXIpOiB0aGlzIHR5cGUgbG9va3Mgd3JvbmdcbiAgW3Byb3A6IHN0cmluZ106IHN0cmluZztcbn07XG5cbi8qKlxuICogRmFjdG9yeSB0byBjcmVhdGUgYSBgTWV0YWAgc2VydmljZSBpbnN0YW5jZSBmb3IgdGhlIGN1cnJlbnQgRE9NIGRvY3VtZW50LlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTWV0YSgpIHtcbiAgcmV0dXJuIG5ldyBNZXRhKMm1ybVpbmplY3QoRE9DVU1FTlQpKTtcbn1cblxuLyoqXG4gKiBBIHNlcnZpY2UgZm9yIG1hbmFnaW5nIEhUTUwgYDxtZXRhPmAgdGFncy5cbiAqXG4gKiBQcm9wZXJ0aWVzIG9mIHRoZSBgTWV0YURlZmluaXRpb25gIG9iamVjdCBtYXRjaCB0aGUgYXR0cmlidXRlcyBvZiB0aGVcbiAqIEhUTUwgYDxtZXRhPmAgdGFnLiBUaGVzZSB0YWdzIGRlZmluZSBkb2N1bWVudCBtZXRhZGF0YSB0aGF0IGlzIGltcG9ydGFudCBmb3JcbiAqIHRoaW5ncyBsaWtlIGNvbmZpZ3VyaW5nIGEgQ29udGVudCBTZWN1cml0eSBQb2xpY3ksIGRlZmluaW5nIGJyb3dzZXIgY29tcGF0aWJpbGl0eVxuICogYW5kIHNlY3VyaXR5IHNldHRpbmdzLCBzZXR0aW5nIEhUVFAgSGVhZGVycywgZGVmaW5pbmcgcmljaCBjb250ZW50IGZvciBzb2NpYWwgc2hhcmluZyxcbiAqIGFuZCBTZWFyY2ggRW5naW5lIE9wdGltaXphdGlvbiAoU0VPKS5cbiAqXG4gKiBUbyBpZGVudGlmeSBzcGVjaWZpYyBgPG1ldGE+YCB0YWdzIGluIGEgZG9jdW1lbnQsIHVzZSBhbiBhdHRyaWJ1dGUgc2VsZWN0aW9uXG4gKiBzdHJpbmcgaW4gdGhlIGZvcm1hdCBgXCJ0YWdfYXR0cmlidXRlPSd2YWx1ZSBzdHJpbmcnXCJgLlxuICogRm9yIGV4YW1wbGUsIGFuIGBhdHRyU2VsZWN0b3JgIHZhbHVlIG9mIGBcIm5hbWU9J2Rlc2NyaXB0aW9uJ1wiYCBtYXRjaGVzIGEgdGFnXG4gKiB3aG9zZSBgbmFtZWAgYXR0cmlidXRlIGhhcyB0aGUgdmFsdWUgYFwiZGVzY3JpcHRpb25cImAuXG4gKiBTZWxlY3RvcnMgYXJlIHVzZWQgd2l0aCB0aGUgYHF1ZXJ5U2VsZWN0b3IoKWAgRG9jdW1lbnQgbWV0aG9kLFxuICogaW4gdGhlIGZvcm1hdCBgbWV0YVt7YXR0clNlbGVjdG9yfV1gLlxuICpcbiAqIEBzZWUgW0hUTUwgbWV0YSB0YWddKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0hUTUwvRWxlbWVudC9tZXRhKVxuICogQHNlZSBbRG9jdW1lbnQucXVlcnlTZWxlY3RvcigpXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQvcXVlcnlTZWxlY3RvcilcbiAqXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnLCB1c2VGYWN0b3J5OiBjcmVhdGVNZXRhLCBkZXBzOiBbXX0pXG5leHBvcnQgY2xhc3MgTWV0YSB7XG4gIHByaXZhdGUgX2RvbTogRG9tQWRhcHRlcjtcbiAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jOiBhbnkpIHtcbiAgICB0aGlzLl9kb20gPSBnZXRET00oKTtcbiAgfVxuICAvKipcbiAgICogUmV0cmlldmVzIG9yIGNyZWF0ZXMgYSBzcGVjaWZpYyBgPG1ldGE+YCB0YWcgZWxlbWVudCBpbiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBJbiBzZWFyY2hpbmcgZm9yIGFuIGV4aXN0aW5nIHRhZywgQW5ndWxhciBhdHRlbXB0cyB0byBtYXRjaCB0aGUgYG5hbWVgIG9yIGBwcm9wZXJ0eWAgYXR0cmlidXRlXG4gICAqIHZhbHVlcyBpbiB0aGUgcHJvdmlkZWQgdGFnIGRlZmluaXRpb24sIGFuZCB2ZXJpZmllcyB0aGF0IGFsbCBvdGhlciBhdHRyaWJ1dGUgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICogSWYgYW4gZXhpc3RpbmcgZWxlbWVudCBpcyBmb3VuZCwgaXQgaXMgcmV0dXJuZWQgYW5kIGlzIG5vdCBtb2RpZmllZCBpbiBhbnkgd2F5LlxuICAgKiBAcGFyYW0gdGFnIFRoZSBkZWZpbml0aW9uIG9mIGEgYDxtZXRhPmAgZWxlbWVudCB0byBtYXRjaCBvciBjcmVhdGUuXG4gICAqIEBwYXJhbSBmb3JjZUNyZWF0aW9uIFRydWUgdG8gY3JlYXRlIGEgbmV3IGVsZW1lbnQgd2l0aG91dCBjaGVja2luZyB3aGV0aGVyIG9uZSBhbHJlYWR5IGV4aXN0cy5cbiAgICogQHJldHVybnMgVGhlIGV4aXN0aW5nIGVsZW1lbnQgd2l0aCB0aGUgc2FtZSBhdHRyaWJ1dGVzIGFuZCB2YWx1ZXMgaWYgZm91bmQsXG4gICAqIHRoZSBuZXcgZWxlbWVudCBpZiBubyBtYXRjaCBpcyBmb3VuZCwgb3IgYG51bGxgIGlmIHRoZSB0YWcgcGFyYW1ldGVyIGlzIG5vdCBkZWZpbmVkLlxuICAgKi9cbiAgYWRkVGFnKHRhZzogTWV0YURlZmluaXRpb24sIGZvcmNlQ3JlYXRpb246IGJvb2xlYW4gPSBmYWxzZSk6IEhUTUxNZXRhRWxlbWVudHxudWxsIHtcbiAgICBpZiAoIXRhZykgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuX2dldE9yQ3JlYXRlRWxlbWVudCh0YWcsIGZvcmNlQ3JlYXRpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBvciBjcmVhdGVzIGEgc2V0IG9mIGA8bWV0YT5gIHRhZyBlbGVtZW50cyBpbiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBJbiBzZWFyY2hpbmcgZm9yIGFuIGV4aXN0aW5nIHRhZywgQW5ndWxhciBhdHRlbXB0cyB0byBtYXRjaCB0aGUgYG5hbWVgIG9yIGBwcm9wZXJ0eWAgYXR0cmlidXRlXG4gICAqIHZhbHVlcyBpbiB0aGUgcHJvdmlkZWQgdGFnIGRlZmluaXRpb24sIGFuZCB2ZXJpZmllcyB0aGF0IGFsbCBvdGhlciBhdHRyaWJ1dGUgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICogQHBhcmFtIHRhZ3MgQW4gYXJyYXkgb2YgdGFnIGRlZmluaXRpb25zIHRvIG1hdGNoIG9yIGNyZWF0ZS5cbiAgICogQHBhcmFtIGZvcmNlQ3JlYXRpb24gVHJ1ZSB0byBjcmVhdGUgbmV3IGVsZW1lbnRzIHdpdGhvdXQgY2hlY2tpbmcgd2hldGhlciB0aGV5IGFscmVhZHkgZXhpc3QuXG4gICAqIEByZXR1cm5zIFRoZSBtYXRjaGluZyBlbGVtZW50cyBpZiBmb3VuZCwgb3IgdGhlIG5ldyBlbGVtZW50cy5cbiAgICovXG4gIGFkZFRhZ3ModGFnczogTWV0YURlZmluaXRpb25bXSwgZm9yY2VDcmVhdGlvbjogYm9vbGVhbiA9IGZhbHNlKTogSFRNTE1ldGFFbGVtZW50W10ge1xuICAgIGlmICghdGFncykgcmV0dXJuIFtdO1xuICAgIHJldHVybiB0YWdzLnJlZHVjZSgocmVzdWx0OiBIVE1MTWV0YUVsZW1lbnRbXSwgdGFnOiBNZXRhRGVmaW5pdGlvbikgPT4ge1xuICAgICAgaWYgKHRhZykge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLl9nZXRPckNyZWF0ZUVsZW1lbnQodGFnLCBmb3JjZUNyZWF0aW9uKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sIFtdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBgPG1ldGE+YCB0YWcgZWxlbWVudCBpbiB0aGUgY3VycmVudCBIVE1MIGRvY3VtZW50LlxuICAgKiBAcGFyYW0gYXR0clNlbGVjdG9yIFRoZSB0YWcgYXR0cmlidXRlIGFuZCB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0LCBpbiB0aGUgZm9ybWF0XG4gICAqIGBcInRhZ19hdHRyaWJ1dGU9J3ZhbHVlIHN0cmluZydcImAuXG4gICAqIEByZXR1cm5zIFRoZSBtYXRjaGluZyBlbGVtZW50LCBpZiBhbnkuXG4gICAqL1xuICBnZXRUYWcoYXR0clNlbGVjdG9yOiBzdHJpbmcpOiBIVE1MTWV0YUVsZW1lbnR8bnVsbCB7XG4gICAgaWYgKCFhdHRyU2VsZWN0b3IpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9kb2MucXVlcnlTZWxlY3RvcihgbWV0YVske2F0dHJTZWxlY3Rvcn1dYCkgfHwgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBzZXQgb2YgYDxtZXRhPmAgdGFnIGVsZW1lbnRzIGluIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBhdHRyU2VsZWN0b3IgVGhlIHRhZyBhdHRyaWJ1dGUgYW5kIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QsIGluIHRoZSBmb3JtYXRcbiAgICogYFwidGFnX2F0dHJpYnV0ZT0ndmFsdWUgc3RyaW5nJ1wiYC5cbiAgICogQHJldHVybnMgVGhlIG1hdGNoaW5nIGVsZW1lbnRzLCBpZiBhbnkuXG4gICAqL1xuICBnZXRUYWdzKGF0dHJTZWxlY3Rvcjogc3RyaW5nKTogSFRNTE1ldGFFbGVtZW50W10ge1xuICAgIGlmICghYXR0clNlbGVjdG9yKSByZXR1cm4gW107XG4gICAgY29uc3QgbGlzdCAvKk5vZGVMaXN0Ki8gPSB0aGlzLl9kb2MucXVlcnlTZWxlY3RvckFsbChgbWV0YVske2F0dHJTZWxlY3Rvcn1dYCk7XG4gICAgcmV0dXJuIGxpc3QgPyBbXS5zbGljZS5jYWxsKGxpc3QpIDogW107XG4gIH1cblxuICAvKipcbiAgICogTW9kaWZpZXMgYW4gZXhpc3RpbmcgYDxtZXRhPmAgdGFnIGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgSFRNTCBkb2N1bWVudC5cbiAgICogQHBhcmFtIHRhZyBUaGUgdGFnIGRlc2NyaXB0aW9uIHdpdGggd2hpY2ggdG8gcmVwbGFjZSB0aGUgZXhpc3RpbmcgdGFnIGNvbnRlbnQuXG4gICAqIEBwYXJhbSBzZWxlY3RvciBBIHRhZyBhdHRyaWJ1dGUgYW5kIHZhbHVlIHRvIG1hdGNoIGFnYWluc3QsIHRvIGlkZW50aWZ5XG4gICAqIGFuIGV4aXN0aW5nIHRhZy4gQSBzdHJpbmcgaW4gdGhlIGZvcm1hdCBgXCJ0YWdfYXR0cmlidXRlPWB2YWx1ZSBzdHJpbmdgXCJgLlxuICAgKiBJZiBub3Qgc3VwcGxpZWQsIG1hdGNoZXMgYSB0YWcgd2l0aCB0aGUgc2FtZSBgbmFtZWAgb3IgYHByb3BlcnR5YCBhdHRyaWJ1dGUgdmFsdWUgYXMgdGhlXG4gICAqIHJlcGxhY2VtZW50IHRhZy5cbiAgICogQHJldHVybiBUaGUgbW9kaWZpZWQgZWxlbWVudC5cbiAgICovXG4gIHVwZGF0ZVRhZyh0YWc6IE1ldGFEZWZpbml0aW9uLCBzZWxlY3Rvcj86IHN0cmluZyk6IEhUTUxNZXRhRWxlbWVudHxudWxsIHtcbiAgICBpZiAoIXRhZykgcmV0dXJuIG51bGw7XG4gICAgc2VsZWN0b3IgPSBzZWxlY3RvciB8fCB0aGlzLl9wYXJzZVNlbGVjdG9yKHRhZyk7XG4gICAgY29uc3QgbWV0YTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5nZXRUYWcoc2VsZWN0b3IpITtcbiAgICBpZiAobWV0YSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3NldE1ldGFFbGVtZW50QXR0cmlidXRlcyh0YWcsIG1ldGEpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fZ2V0T3JDcmVhdGVFbGVtZW50KHRhZywgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBleGlzdGluZyBgPG1ldGE+YCB0YWcgZWxlbWVudCBmcm9tIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBhdHRyU2VsZWN0b3IgQSB0YWcgYXR0cmlidXRlIGFuZCB2YWx1ZSB0byBtYXRjaCBhZ2FpbnN0LCB0byBpZGVudGlmeVxuICAgKiBhbiBleGlzdGluZyB0YWcuIEEgc3RyaW5nIGluIHRoZSBmb3JtYXQgYFwidGFnX2F0dHJpYnV0ZT1gdmFsdWUgc3RyaW5nYFwiYC5cbiAgICovXG4gIHJlbW92ZVRhZyhhdHRyU2VsZWN0b3I6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlVGFnRWxlbWVudCh0aGlzLmdldFRhZyhhdHRyU2VsZWN0b3IpISk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBleGlzdGluZyBgPG1ldGE+YCB0YWcgZWxlbWVudCBmcm9tIHRoZSBjdXJyZW50IEhUTUwgZG9jdW1lbnQuXG4gICAqIEBwYXJhbSBtZXRhIFRoZSB0YWcgZGVmaW5pdGlvbiB0byBtYXRjaCBhZ2FpbnN0IHRvIGlkZW50aWZ5IGFuIGV4aXN0aW5nIHRhZy5cbiAgICovXG4gIHJlbW92ZVRhZ0VsZW1lbnQobWV0YTogSFRNTE1ldGFFbGVtZW50KTogdm9pZCB7XG4gICAgaWYgKG1ldGEpIHtcbiAgICAgIHRoaXMuX2RvbS5yZW1vdmUobWV0YSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3JDcmVhdGVFbGVtZW50KG1ldGE6IE1ldGFEZWZpbml0aW9uLCBmb3JjZUNyZWF0aW9uOiBib29sZWFuID0gZmFsc2UpOlxuICAgICAgSFRNTE1ldGFFbGVtZW50IHtcbiAgICBpZiAoIWZvcmNlQ3JlYXRpb24pIHtcbiAgICAgIGNvbnN0IHNlbGVjdG9yOiBzdHJpbmcgPSB0aGlzLl9wYXJzZVNlbGVjdG9yKG1ldGEpO1xuICAgICAgY29uc3QgZWxlbTogSFRNTE1ldGFFbGVtZW50ID0gdGhpcy5nZXRUYWcoc2VsZWN0b3IpITtcbiAgICAgIC8vIEl0J3MgYWxsb3dlZCB0byBoYXZlIG11bHRpcGxlIGVsZW1lbnRzIHdpdGggdGhlIHNhbWUgbmFtZSBzbyBpdCdzIG5vdCBlbm91Z2ggdG9cbiAgICAgIC8vIGp1c3QgY2hlY2sgdGhhdCBlbGVtZW50IHdpdGggdGhlIHNhbWUgbmFtZSBhbHJlYWR5IHByZXNlbnQgb24gdGhlIHBhZ2UuIFdlIGFsc28gbmVlZCB0b1xuICAgICAgLy8gY2hlY2sgaWYgZWxlbWVudCBoYXMgdGFnIGF0dHJpYnV0ZXNcbiAgICAgIGlmIChlbGVtICYmIHRoaXMuX2NvbnRhaW5zQXR0cmlidXRlcyhtZXRhLCBlbGVtKSkgcmV0dXJuIGVsZW07XG4gICAgfVxuICAgIGNvbnN0IGVsZW1lbnQ6IEhUTUxNZXRhRWxlbWVudCA9IHRoaXMuX2RvbS5jcmVhdGVFbGVtZW50KCdtZXRhJykgYXMgSFRNTE1ldGFFbGVtZW50O1xuICAgIHRoaXMuX3NldE1ldGFFbGVtZW50QXR0cmlidXRlcyhtZXRhLCBlbGVtZW50KTtcbiAgICBjb25zdCBoZWFkID0gdGhpcy5fZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE1ldGFFbGVtZW50QXR0cmlidXRlcyh0YWc6IE1ldGFEZWZpbml0aW9uLCBlbDogSFRNTE1ldGFFbGVtZW50KTogSFRNTE1ldGFFbGVtZW50IHtcbiAgICBPYmplY3Qua2V5cyh0YWcpLmZvckVhY2goKHByb3A6IHN0cmluZykgPT4gZWwuc2V0QXR0cmlidXRlKHByb3AsIHRhZ1twcm9wXSkpO1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHByaXZhdGUgX3BhcnNlU2VsZWN0b3IodGFnOiBNZXRhRGVmaW5pdGlvbik6IHN0cmluZyB7XG4gICAgY29uc3QgYXR0cjogc3RyaW5nID0gdGFnLm5hbWUgPyAnbmFtZScgOiAncHJvcGVydHknO1xuICAgIHJldHVybiBgJHthdHRyfT1cIiR7dGFnW2F0dHJdfVwiYDtcbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRhaW5zQXR0cmlidXRlcyh0YWc6IE1ldGFEZWZpbml0aW9uLCBlbGVtOiBIVE1MTWV0YUVsZW1lbnQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGFnKS5ldmVyeSgoa2V5OiBzdHJpbmcpID0+IGVsZW0uZ2V0QXR0cmlidXRlKGtleSkgPT09IHRhZ1trZXldKTtcbiAgfVxufVxuIl19