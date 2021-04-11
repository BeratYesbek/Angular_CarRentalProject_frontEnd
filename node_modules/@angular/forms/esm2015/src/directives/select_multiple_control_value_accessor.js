/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, forwardRef, Host, Input, Optional, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from './control_value_accessor';
import * as ɵngcc0 from '@angular/core';
export const SELECT_MULTIPLE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectMultipleControlValueAccessor),
    multi: true
};
function _buildValueString(id, value) {
    if (id == null)
        return `${value}`;
    if (typeof value === 'string')
        value = `'${value}'`;
    if (value && typeof value === 'object')
        value = 'Object';
    return `${id}: ${value}`.slice(0, 50);
}
function _extractId(valueString) {
    return valueString.split(':')[0];
}
/** Mock interface for HTMLCollection */
class HTMLCollection {
}
/**
 * @description
 * The `ControlValueAccessor` for writing multi-select control values and listening to multi-select
 * control changes. The value accessor is used by the `FormControlDirective`, `FormControlName`, and
 * `NgModel` directives.
 *
 * @see `SelectControlValueAccessor`
 *
 * @usageNotes
 *
 * ### Using a multi-select control
 *
 * The follow example shows you how to use a multi-select control with a reactive form.
 *
 * ```ts
 * const countryControl = new FormControl();
 * ```
 *
 * ```
 * <select multiple name="countries" [formControl]="countryControl">
 *   <option *ngFor="let country of countries" [ngValue]="country">
 *     {{ country.name }}
 *   </option>
 * </select>
 * ```
 *
 * ### Customizing option selection
 *
 * To customize the default option comparison algorithm, `<select>` supports `compareWith` input.
 * See the `SelectControlValueAccessor` for usage.
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
export class SelectMultipleControlValueAccessor {
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        /** @internal */
        this._optionMap = new Map();
        /** @internal */
        this._idCounter = 0;
        /**
         * @description
         * The registered callback function called when a change event occurs on the input element.
         */
        this.onChange = (_) => { };
        /**
         * @description
         * The registered callback function called when a blur event occurs on the input element.
         */
        this.onTouched = () => { };
        this._compareWith = Object.is;
    }
    /**
     * @description
     * Tracks the option comparison algorithm for tracking identities when
     * checking for changes.
     */
    set compareWith(fn) {
        if (typeof fn !== 'function') {
            throw new Error(`compareWith must be a function, but received ${JSON.stringify(fn)}`);
        }
        this._compareWith = fn;
    }
    /**
     * @description
     * Sets the "value" property on one or of more
     * of the select's options.
     *
     * @param value The value
     */
    writeValue(value) {
        this.value = value;
        let optionSelectedStateSetter;
        if (Array.isArray(value)) {
            // convert values to ids
            const ids = value.map((v) => this._getOptionId(v));
            optionSelectedStateSetter = (opt, o) => {
                opt._setSelected(ids.indexOf(o.toString()) > -1);
            };
        }
        else {
            optionSelectedStateSetter = (opt, o) => {
                opt._setSelected(false);
            };
        }
        this._optionMap.forEach(optionSelectedStateSetter);
    }
    /**
     * @description
     * Registers a function called when the control value changes
     * and writes an array of the selected options.
     *
     * @param fn The callback function
     */
    registerOnChange(fn) {
        this.onChange = (_) => {
            const selected = [];
            if (_.selectedOptions !== undefined) {
                const options = _.selectedOptions;
                for (let i = 0; i < options.length; i++) {
                    const opt = options.item(i);
                    const val = this._getOptionValue(opt.value);
                    selected.push(val);
                }
            }
            // Degrade on IE
            else {
                const options = _.options;
                for (let i = 0; i < options.length; i++) {
                    const opt = options.item(i);
                    if (opt.selected) {
                        const val = this._getOptionValue(opt.value);
                        selected.push(val);
                    }
                }
            }
            this.value = selected;
            fn(selected);
        };
    }
    /**
     * @description
     * Registers a function called when the control is touched.
     *
     * @param fn The callback function
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Sets the "disabled" property on the select input element.
     *
     * @param isDisabled The disabled value
     */
    setDisabledState(isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    }
    /** @internal */
    _registerOption(value) {
        const id = (this._idCounter++).toString();
        this._optionMap.set(id, value);
        return id;
    }
    /** @internal */
    _getOptionId(value) {
        for (const id of Array.from(this._optionMap.keys())) {
            if (this._compareWith(this._optionMap.get(id)._value, value))
                return id;
        }
        return null;
    }
    /** @internal */
    _getOptionValue(valueString) {
        const id = _extractId(valueString);
        return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
    }
}
SelectMultipleControlValueAccessor.ɵfac = function SelectMultipleControlValueAccessor_Factory(t) { return new (t || SelectMultipleControlValueAccessor)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef)); };
SelectMultipleControlValueAccessor.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: SelectMultipleControlValueAccessor, selectors: [["select", "multiple", "", "formControlName", ""], ["select", "multiple", "", "formControl", ""], ["select", "multiple", "", "ngModel", ""]], hostBindings: function SelectMultipleControlValueAccessor_HostBindings(rf, ctx) { if (rf & 1) {
        ɵngcc0.ɵɵlistener("change", function SelectMultipleControlValueAccessor_change_HostBindingHandler($event) { return ctx.onChange($event.target); })("blur", function SelectMultipleControlValueAccessor_blur_HostBindingHandler() { return ctx.onTouched(); });
    } }, inputs: { compareWith: "compareWith" }, features: [ɵngcc0.ɵɵProvidersFeature([SELECT_MULTIPLE_VALUE_ACCESSOR])] });
SelectMultipleControlValueAccessor.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
SelectMultipleControlValueAccessor.propDecorators = {
    compareWith: [{ type: Input }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(SelectMultipleControlValueAccessor, [{
        type: Directive,
        args: [{
                selector: 'select[multiple][formControlName],select[multiple][formControl],select[multiple][ngModel]',
                host: { '(change)': 'onChange($event.target)', '(blur)': 'onTouched()' },
                providers: [SELECT_MULTIPLE_VALUE_ACCESSOR]
            }]
    }], function () { return [{ type: ɵngcc0.Renderer2 }, { type: ɵngcc0.ElementRef }]; }, { compareWith: [{
            type: Input
        }] }); })();
/**
 * @description
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * @see `SelectMultipleControlValueAccessor`
 *
 * @ngModule ReactiveFormsModule
 * @ngModule FormsModule
 * @publicApi
 */
export class ɵNgSelectMultipleOption {
    constructor(_element, _renderer, _select) {
        this._element = _element;
        this._renderer = _renderer;
        this._select = _select;
        if (this._select) {
            this.id = this._select._registerOption(this);
        }
    }
    /**
     * @description
     * Tracks the value bound to the option element. Unlike the value binding,
     * ngValue supports binding to objects.
     */
    set ngValue(value) {
        if (this._select == null)
            return;
        this._value = value;
        this._setElementValue(_buildValueString(this.id, value));
        this._select.writeValue(this._select.value);
    }
    /**
     * @description
     * Tracks simple string values bound to the option element.
     * For objects, use the `ngValue` input binding.
     */
    set value(value) {
        if (this._select) {
            this._value = value;
            this._setElementValue(_buildValueString(this.id, value));
            this._select.writeValue(this._select.value);
        }
        else {
            this._setElementValue(value);
        }
    }
    /** @internal */
    _setElementValue(value) {
        this._renderer.setProperty(this._element.nativeElement, 'value', value);
    }
    /** @internal */
    _setSelected(selected) {
        this._renderer.setProperty(this._element.nativeElement, 'selected', selected);
    }
    /**
     * @description
     * Lifecycle method called before the directive's instance is destroyed. For internal use only.
     */
    ngOnDestroy() {
        if (this._select) {
            this._select._optionMap.delete(this.id);
            this._select.writeValue(this._select.value);
        }
    }
}
ɵNgSelectMultipleOption.ɵfac = function ɵNgSelectMultipleOption_Factory(t) { return new (t || ɵNgSelectMultipleOption)(ɵngcc0.ɵɵdirectiveInject(ɵngcc0.ElementRef), ɵngcc0.ɵɵdirectiveInject(ɵngcc0.Renderer2), ɵngcc0.ɵɵdirectiveInject(SelectMultipleControlValueAccessor, 9)); };
ɵNgSelectMultipleOption.ɵdir = ɵngcc0.ɵɵdefineDirective({ type: ɵNgSelectMultipleOption, selectors: [["option"]], inputs: { ngValue: "ngValue", value: "value" } });
ɵNgSelectMultipleOption.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: SelectMultipleControlValueAccessor, decorators: [{ type: Optional }, { type: Host }] }
];
ɵNgSelectMultipleOption.propDecorators = {
    ngValue: [{ type: Input, args: ['ngValue',] }],
    value: [{ type: Input, args: ['value',] }]
};
/*@__PURE__*/ (function () { ɵngcc0.ɵsetClassMetadata(ɵNgSelectMultipleOption, [{
        type: Directive,
        args: [{ selector: 'option' }]
    }], function () { return [{ type: ɵngcc0.ElementRef }, { type: ɵngcc0.Renderer2 }, { type: SelectMultipleControlValueAccessor, decorators: [{
                type: Optional
            }, {
                type: Host
            }] }]; }, { ngValue: [{
            type: Input,
            args: ['ngValue']
        }], value: [{
            type: Input,
            args: ['value']
        }] }); })();
export { ɵNgSelectMultipleOption as NgSelectMultipleOption };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0X211bHRpcGxlX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3IuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL3NlbGVjdF9tdWx0aXBsZV9jb250cm9sX3ZhbHVlX2FjY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsU0FBUyxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUU3SCxPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7O0FBRWpGLE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFtQjtBQUM5RCxJQUFFLE9BQU8sRUFBRSxpQkFBaUI7QUFDNUIsSUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO0FBQ25FLElBQUUsS0FBSyxFQUFFLElBQUk7QUFDYixDQUFDLENBQUM7QUFFRixTQUFTLGlCQUFpQixDQUFDLEVBQVUsRUFBRSxLQUFVO0FBQUksSUFDbkQsSUFBSSxFQUFFLElBQUksSUFBSTtBQUFFLFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxDQUFDO0FBQ3BDLElBQUUsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO0FBQUUsUUFBQSxLQUFLLEdBQUcsSUFBSSxLQUFLLEdBQUcsQ0FBQztBQUN0RCxJQUFFLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7QUFBRSxRQUFBLEtBQUssR0FBRyxRQUFRLENBQUM7QUFDM0QsSUFBRSxPQUFPLEdBQUcsRUFBRSxLQUFLLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUVELFNBQVMs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SCxJQUNFLGdCQUFnQjtBQUNsQixJQUFFLFlBQVksQ0FBQyxRQUFpQjtBQUNoQyxRQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRixJQUFFLENBQUM7QUFDSCxJQUNFO0FBQ0Y7QUFDRTtBQUNFLE9BQUM7QUFDTCxJQUFFLFdBQVc7QUFBSyxRQUNkLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUN0QixZQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDOUMsWUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xELFNBQUs7QUFDTCxJQUFFLENBQUM7QUFDSDttREFoRUMsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQztvS0FDMUI7QUFBQztBQUFpRCxZQWxPcEMsVUFBVTtBQUFJLFlBQTRDLFNBQVM7QUFBSSxZQTBPL0Msa0NBQWtDLHVCQUF0RSxRQUFRLFlBQUksSUFBSTtBQUFNO0FBQUc7QUFBMkMsc0JBV3hFLEtBQUssU0FBQyxTQUFTO0FBQ2Isb0JBWUYsS0FBSyxTQUFDLE9BQU87QUFDWjs7Ozs7Ozs7Ozs7Ozs7b0JBQUU7QUFnQ04sT0FBTyxFQUFDLHVCQUF1QixJQUFJLHNCQUFzQixFQUFDLENBQUM7QUFDM0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEhvc3QsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBSZW5kZXJlcjIsIFN0YXRpY1Byb3ZpZGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJy4vY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5cbmV4cG9ydCBjb25zdCBTRUxFQ1RfTVVMVElQTEVfVkFMVUVfQUNDRVNTT1I6IFN0YXRpY1Byb3ZpZGVyID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3NvciksXG4gIG11bHRpOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBfYnVpbGRWYWx1ZVN0cmluZyhpZDogc3RyaW5nLCB2YWx1ZTogYW55KTogc3RyaW5nIHtcbiAgaWYgKGlkID09IG51bGwpIHJldHVybiBgJHt2YWx1ZX1gO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgdmFsdWUgPSBgJyR7dmFsdWV9J2A7XG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB2YWx1ZSA9ICdPYmplY3QnO1xuICByZXR1cm4gYCR7aWR9OiAke3ZhbHVlfWAuc2xpY2UoMCwgNTApO1xufVxuXG5mdW5jdGlvbiBfZXh0cmFjdElkKHZhbHVlU3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gdmFsdWVTdHJpbmcuc3BsaXQoJzonKVswXTtcbn1cblxuLyoqIE1vY2sgaW50ZXJmYWNlIGZvciBIVE1MIE9wdGlvbnMgKi9cbmludGVyZmFjZSBIVE1MT3B0aW9uIHtcbiAgdmFsdWU6IHN0cmluZztcbiAgc2VsZWN0ZWQ6IGJvb2xlYW47XG59XG5cbi8qKiBNb2NrIGludGVyZmFjZSBmb3IgSFRNTENvbGxlY3Rpb24gKi9cbmFic3RyYWN0IGNsYXNzIEhUTUxDb2xsZWN0aW9uIHtcbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIGxlbmd0aCE6IG51bWJlcjtcbiAgYWJzdHJhY3QgaXRlbShfOiBudW1iZXIpOiBIVE1MT3B0aW9uO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIGBDb250cm9sVmFsdWVBY2Nlc3NvcmAgZm9yIHdyaXRpbmcgbXVsdGktc2VsZWN0IGNvbnRyb2wgdmFsdWVzIGFuZCBsaXN0ZW5pbmcgdG8gbXVsdGktc2VsZWN0XG4gKiBjb250cm9sIGNoYW5nZXMuIFRoZSB2YWx1ZSBhY2Nlc3NvciBpcyB1c2VkIGJ5IHRoZSBgRm9ybUNvbnRyb2xEaXJlY3RpdmVgLCBgRm9ybUNvbnRyb2xOYW1lYCwgYW5kXG4gKiBgTmdNb2RlbGAgZGlyZWN0aXZlcy5cbiAqXG4gKiBAc2VlIGBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICMjIyBVc2luZyBhIG11bHRpLXNlbGVjdCBjb250cm9sXG4gKlxuICogVGhlIGZvbGxvdyBleGFtcGxlIHNob3dzIHlvdSBob3cgdG8gdXNlIGEgbXVsdGktc2VsZWN0IGNvbnRyb2wgd2l0aCBhIHJlYWN0aXZlIGZvcm0uXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGNvdW50cnlDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gKiBgYGBcbiAqXG4gKiBgYGBcbiAqIDxzZWxlY3QgbXVsdGlwbGUgbmFtZT1cImNvdW50cmllc1wiIFtmb3JtQ29udHJvbF09XCJjb3VudHJ5Q29udHJvbFwiPlxuICogICA8b3B0aW9uICpuZ0Zvcj1cImxldCBjb3VudHJ5IG9mIGNvdW50cmllc1wiIFtuZ1ZhbHVlXT1cImNvdW50cnlcIj5cbiAqICAgICB7eyBjb3VudHJ5Lm5hbWUgfX1cbiAqICAgPC9vcHRpb24+XG4gKiA8L3NlbGVjdD5cbiAqIGBgYFxuICpcbiAqICMjIyBDdXN0b21pemluZyBvcHRpb24gc2VsZWN0aW9uXG4gKlxuICogVG8gY3VzdG9taXplIHRoZSBkZWZhdWx0IG9wdGlvbiBjb21wYXJpc29uIGFsZ29yaXRobSwgYDxzZWxlY3Q+YCBzdXBwb3J0cyBgY29tcGFyZVdpdGhgIGlucHV0LlxuICogU2VlIHRoZSBgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3JgIGZvciB1c2FnZS5cbiAqXG4gKiBAbmdNb2R1bGUgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICogQG5nTW9kdWxlIEZvcm1zTW9kdWxlXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjpcbiAgICAgICdzZWxlY3RbbXVsdGlwbGVdW2Zvcm1Db250cm9sTmFtZV0sc2VsZWN0W211bHRpcGxlXVtmb3JtQ29udHJvbF0sc2VsZWN0W211bHRpcGxlXVtuZ01vZGVsXScsXG4gIGhvc3Q6IHsnKGNoYW5nZSknOiAnb25DaGFuZ2UoJGV2ZW50LnRhcmdldCknLCAnKGJsdXIpJzogJ29uVG91Y2hlZCgpJ30sXG4gIHByb3ZpZGVyczogW1NFTEVDVF9NVUxUSVBMRV9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgY3VycmVudCB2YWx1ZVxuICAgKi9cbiAgdmFsdWU6IGFueTtcblxuICAvKiogQGludGVybmFsICovXG4gIF9vcHRpb25NYXA6IE1hcDxzdHJpbmcsIMm1TmdTZWxlY3RNdWx0aXBsZU9wdGlvbj4gPSBuZXcgTWFwPHN0cmluZywgybVOZ1NlbGVjdE11bHRpcGxlT3B0aW9uPigpO1xuICAvKiogQGludGVybmFsICovXG4gIF9pZENvdW50ZXI6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgcmVnaXN0ZXJlZCBjYWxsYmFjayBmdW5jdGlvbiBjYWxsZWQgd2hlbiBhIGNoYW5nZSBldmVudCBvY2N1cnMgb24gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAqL1xuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2sgZnVuY3Rpb24gY2FsbGVkIHdoZW4gYSBibHVyIGV2ZW50IG9jY3VycyBvbiB0aGUgaW5wdXQgZWxlbWVudC5cbiAgICovXG4gIG9uVG91Y2hlZCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVHJhY2tzIHRoZSBvcHRpb24gY29tcGFyaXNvbiBhbGdvcml0aG0gZm9yIHRyYWNraW5nIGlkZW50aXRpZXMgd2hlblxuICAgKiBjaGVja2luZyBmb3IgY2hhbmdlcy5cbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCBjb21wYXJlV2l0aChmbjogKG8xOiBhbnksIG8yOiBhbnkpID0+IGJvb2xlYW4pIHtcbiAgICBpZiAodHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNvbXBhcmVXaXRoIG11c3QgYmUgYSBmdW5jdGlvbiwgYnV0IHJlY2VpdmVkICR7SlNPTi5zdHJpbmdpZnkoZm4pfWApO1xuICAgIH1cbiAgICB0aGlzLl9jb21wYXJlV2l0aCA9IGZuO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGFyZVdpdGg6IChvMTogYW55LCBvMjogYW55KSA9PiBib29sZWFuID0gT2JqZWN0LmlzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBTZXRzIHRoZSBcInZhbHVlXCIgcHJvcGVydHkgb24gb25lIG9yIG9mIG1vcmVcbiAgICogb2YgdGhlIHNlbGVjdCdzIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWVcbiAgICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICBsZXQgb3B0aW9uU2VsZWN0ZWRTdGF0ZVNldHRlcjogKG9wdDogybVOZ1NlbGVjdE11bHRpcGxlT3B0aW9uLCBvOiBhbnkpID0+IHZvaWQ7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAvLyBjb252ZXJ0IHZhbHVlcyB0byBpZHNcbiAgICAgIGNvbnN0IGlkcyA9IHZhbHVlLm1hcCgodikgPT4gdGhpcy5fZ2V0T3B0aW9uSWQodikpO1xuICAgICAgb3B0aW9uU2VsZWN0ZWRTdGF0ZVNldHRlciA9IChvcHQsIG8pID0+IHtcbiAgICAgICAgb3B0Ll9zZXRTZWxlY3RlZChpZHMuaW5kZXhPZihvLnRvU3RyaW5nKCkpID4gLTEpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9uU2VsZWN0ZWRTdGF0ZVNldHRlciA9IChvcHQsIG8pID0+IHtcbiAgICAgICAgb3B0Ll9zZXRTZWxlY3RlZChmYWxzZSk7XG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLl9vcHRpb25NYXAuZm9yRWFjaChvcHRpb25TZWxlY3RlZFN0YXRlU2V0dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmVnaXN0ZXJzIGEgZnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgdmFsdWUgY2hhbmdlc1xuICAgKiBhbmQgd3JpdGVzIGFuIGFycmF5IG9mIHRoZSBzZWxlY3RlZCBvcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gZm4gVGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IChfOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkOiBBcnJheTxhbnk+ID0gW107XG4gICAgICBpZiAoXy5zZWxlY3RlZE9wdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBIVE1MQ29sbGVjdGlvbiA9IF8uc2VsZWN0ZWRPcHRpb25zO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBvcHQ6IGFueSA9IG9wdGlvbnMuaXRlbShpKTtcbiAgICAgICAgICBjb25zdCB2YWw6IGFueSA9IHRoaXMuX2dldE9wdGlvblZhbHVlKG9wdC52YWx1ZSk7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaCh2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBEZWdyYWRlIG9uIElFXG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uczogSFRNTENvbGxlY3Rpb24gPSA8SFRNTENvbGxlY3Rpb24+Xy5vcHRpb25zO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBvcHQ6IEhUTUxPcHRpb24gPSBvcHRpb25zLml0ZW0oaSk7XG4gICAgICAgICAgaWYgKG9wdC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgY29uc3QgdmFsOiBhbnkgPSB0aGlzLl9nZXRPcHRpb25WYWx1ZShvcHQudmFsdWUpO1xuICAgICAgICAgICAgc2VsZWN0ZWQucHVzaCh2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZSA9IHNlbGVjdGVkO1xuICAgICAgZm4oc2VsZWN0ZWQpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFJlZ2lzdGVycyBhIGZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sIGlzIHRvdWNoZWQuXG4gICAqXG4gICAqIEBwYXJhbSBmbiBUaGUgY2FsbGJhY2sgZnVuY3Rpb25cbiAgICovXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIFwiZGlzYWJsZWRcIiBwcm9wZXJ0eSBvbiB0aGUgc2VsZWN0IGlucHV0IGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSBpc0Rpc2FibGVkIFRoZSBkaXNhYmxlZCB2YWx1ZVxuICAgKi9cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZ2lzdGVyT3B0aW9uKHZhbHVlOiDJtU5nU2VsZWN0TXVsdGlwbGVPcHRpb24pOiBzdHJpbmcge1xuICAgIGNvbnN0IGlkOiBzdHJpbmcgPSAodGhpcy5faWRDb3VudGVyKyspLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5fb3B0aW9uTWFwLnNldChpZCwgdmFsdWUpO1xuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2dldE9wdGlvbklkKHZhbHVlOiBhbnkpOiBzdHJpbmd8bnVsbCB7XG4gICAgZm9yIChjb25zdCBpZCBvZiBBcnJheS5mcm9tKHRoaXMuX29wdGlvbk1hcC5rZXlzKCkpKSB7XG4gICAgICBpZiAodGhpcy5fY29tcGFyZVdpdGgodGhpcy5fb3B0aW9uTWFwLmdldChpZCkhLl92YWx1ZSwgdmFsdWUpKSByZXR1cm4gaWQ7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZ2V0T3B0aW9uVmFsdWUodmFsdWVTdHJpbmc6IHN0cmluZyk6IGFueSB7XG4gICAgY29uc3QgaWQ6IHN0cmluZyA9IF9leHRyYWN0SWQodmFsdWVTdHJpbmcpO1xuICAgIHJldHVybiB0aGlzLl9vcHRpb25NYXAuaGFzKGlkKSA/IHRoaXMuX29wdGlvbk1hcC5nZXQoaWQpIS5fdmFsdWUgOiB2YWx1ZVN0cmluZztcbiAgfVxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogTWFya3MgYDxvcHRpb24+YCBhcyBkeW5hbWljLCBzbyBBbmd1bGFyIGNhbiBiZSBub3RpZmllZCB3aGVuIG9wdGlvbnMgY2hhbmdlLlxuICpcbiAqIEBzZWUgYFNlbGVjdE11bHRpcGxlQ29udHJvbFZhbHVlQWNjZXNzb3JgXG4gKlxuICogQG5nTW9kdWxlIFJlYWN0aXZlRm9ybXNNb2R1bGVcbiAqIEBuZ01vZHVsZSBGb3Jtc01vZHVsZVxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ29wdGlvbid9KVxuZXhwb3J0IGNsYXNzIMm1TmdTZWxlY3RNdWx0aXBsZU9wdGlvbiBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBpZCE6IHN0cmluZztcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdmFsdWU6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICBAT3B0aW9uYWwoKSBASG9zdCgpIHByaXZhdGUgX3NlbGVjdDogU2VsZWN0TXVsdGlwbGVDb250cm9sVmFsdWVBY2Nlc3Nvcikge1xuICAgIGlmICh0aGlzLl9zZWxlY3QpIHtcbiAgICAgIHRoaXMuaWQgPSB0aGlzLl9zZWxlY3QuX3JlZ2lzdGVyT3B0aW9uKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVHJhY2tzIHRoZSB2YWx1ZSBib3VuZCB0byB0aGUgb3B0aW9uIGVsZW1lbnQuIFVubGlrZSB0aGUgdmFsdWUgYmluZGluZyxcbiAgICogbmdWYWx1ZSBzdXBwb3J0cyBiaW5kaW5nIHRvIG9iamVjdHMuXG4gICAqL1xuICBASW5wdXQoJ25nVmFsdWUnKVxuICBzZXQgbmdWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHRoaXMuX3NlbGVjdCA9PSBudWxsKSByZXR1cm47XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9zZXRFbGVtZW50VmFsdWUoX2J1aWxkVmFsdWVTdHJpbmcodGhpcy5pZCwgdmFsdWUpKTtcbiAgICB0aGlzLl9zZWxlY3Qud3JpdGVWYWx1ZSh0aGlzLl9zZWxlY3QudmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUcmFja3Mgc2ltcGxlIHN0cmluZyB2YWx1ZXMgYm91bmQgdG8gdGhlIG9wdGlvbiBlbGVtZW50LlxuICAgKiBGb3Igb2JqZWN0cywgdXNlIHRoZSBgbmdWYWx1ZWAgaW5wdXQgYmluZGluZy5cbiAgICovXG4gIEBJbnB1dCgndmFsdWUnKVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0aGlzLl9zZWxlY3QpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9zZXRFbGVtZW50VmFsdWUoX2J1aWxkVmFsdWVTdHJpbmcodGhpcy5pZCwgdmFsdWUpKTtcbiAgICAgIHRoaXMuX3NlbGVjdC53cml0ZVZhbHVlKHRoaXMuX3NlbGVjdC52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldEVsZW1lbnRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc2V0RWxlbWVudFZhbHVlKHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICd2YWx1ZScsIHZhbHVlKTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3NldFNlbGVjdGVkKHNlbGVjdGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnc2VsZWN0ZWQnLCBzZWxlY3RlZCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIExpZmVjeWNsZSBtZXRob2QgY2FsbGVkIGJlZm9yZSB0aGUgZGlyZWN0aXZlJ3MgaW5zdGFuY2UgaXMgZGVzdHJveWVkLiBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gICAqL1xuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fc2VsZWN0KSB7XG4gICAgICB0aGlzLl9zZWxlY3QuX29wdGlvbk1hcC5kZWxldGUodGhpcy5pZCk7XG4gICAgICB0aGlzLl9zZWxlY3Qud3JpdGVWYWx1ZSh0aGlzLl9zZWxlY3QudmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQge8m1TmdTZWxlY3RNdWx0aXBsZU9wdGlvbiBhcyBOZ1NlbGVjdE11bHRpcGxlT3B0aW9ufTtcbiJdfQ==