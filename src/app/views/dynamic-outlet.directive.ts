import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, Type, ViewContainerRef } from '@angular/core';
import { Phase } from 'src/Models/Phase';

@Directive({
  selector: '[appDynamicOutlet]'
})
export class DynamicOutletDirective implements OnChanges,OnDestroy { 

  @Input()
   phase:string;
  
  @Input() 
   appDynamicOutlet: Type<any>;

  private componentRef: ComponentRef<any> = null;

  loadAPI: Promise<any>;

  constructor(private vcRef:ViewContainerRef) {

   } 
   ngOnChanges(changes: SimpleChanges) {
    this.vcRef.clear();
    this.componentRef = null;

    if (this.appDynamicOutlet) {
      const elInjector = this.vcRef.parentInjector;
      const componentFactoryResolver = elInjector.get(ComponentFactoryResolver);

      const componentFactory = componentFactoryResolver.resolveComponentFactory(this.appDynamicOutlet);
      this.componentRef = componentFactory.create(elInjector);
   
      this.componentRef.changeDetectorRef.detectChanges();
      this.componentRef.instance.model = this.phase;
      this.vcRef.createEmbeddedView(this.componentRef.instance.template, { $implicit:  { phase :  this.phase } });
    }
  }

  ngOnDestroy() {
    if(this.componentRef) {
      this.vcRef.clear();
      this.vcRef = null;
    }
  }

}
