import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: "[FileChange]"
})


export class FileChangeDirective {
    @HostListener('keyup', ['$event'])
  
    inputChanged(event) {
        console.log("KEYUP",event)
    }
    inputRef: HTMLElement;
    file_val: string
    file_size:string | number = 0;
    @Input() set FileChange(filevalue: [string,number] | string) {
        if(filevalue.length ==2)
        {
        this.file_val = filevalue[0];
        this.file_size = filevalue [1];
        }
        else if (typeof filevalue === "string") {
            this.file_val = filevalue
        }
    }

    constructor(private readonly el: ElementRef) {
        this.inputRef = el.nativeElement;
        this.inputRef.addEventListener("change", () => this.Filechange())
        console.log("Trigger");
    }
    Filechange() {
        console.log("changed", this.inputRef['files'], this.file_val,this.file_size);
    }

}
