import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sanitizeme",
})
export class SanitizemePipe implements PipeTransform {
  transform(val: any, args?: any): any {
    let regx1 = /<b>/gi;
    let regx2 = /<\/b>/gi;
    val = val.replace(regx1, "");
    val = val.replace(regx2, "");
    return val;
  }
}
