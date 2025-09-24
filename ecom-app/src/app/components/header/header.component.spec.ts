import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CartService', ['getCartItemCount'], {
      cart$: new BehaviorSubject([])
    });

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        RouterTestingModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        {provide: CartService, useValue: spy}
      ]
    })
    .compileComponents();

    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cartServiceSpy.getCartItemCount.and.returnValue(new BehaviorSubject(0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display app title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.app-title span').textContent).toContain('E-Com');
  });

  it('should display navigation link', () =>{
    const compiled = fixture.nativeElement;
    const navButtons = compiled.querySelectorAll('.nav-button');
    expect(navButtons.length).toBe(3); // Accueil, Produits et Contact
  });

   it('should display cart badge when items exist', () => {
    cartServiceSpy.getCartItemCount.and.returnValue(new BehaviorSubject(3));
    component.ngOnInit();
    fixture.detectChanges();

    component.cartItemsCount$.subscribe(count => {
      expect(count).toBe(3);
    });
  });
});



