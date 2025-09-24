import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

 beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create contact form with email and message fields', () => {
    expect(component.contactForm.get('email')).toBeTruthy();
    expect(component.contactForm.get('message')).toBeTruthy();
  });

  it('should require email field', () => {
    const emailControl = component.contactForm.get('email');
    expect(emailControl?.valid).toBeFalsy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');

    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should require message field', () => {
    const messageControl = component.contactForm.get('message');
    expect(messageControl?.valid).toBeFalsy();

    messageControl?.setValue('Test message');
    expect(messageControl?.valid).toBeTruthy();
  });

  it('should validate message max length', () => {
    const messageControl = component.contactForm.get('message');
    const longMessage = 'a'.repeat(301);

    messageControl?.setValue(longMessage);
    expect(messageControl?.hasError('maxlength')).toBeTruthy();

    messageControl?.setValue('Valid message');
    expect(messageControl?.hasError('maxlength')).toBeFalsy();
  });

  it('should return correct email error messages', () => {
    const emailControl = component.contactForm.get('email');

    emailControl?.setErrors({ required: true });
    expect(component.getEmailErrorMessage()).toBe('Vous devez entrer une adresse email');

    emailControl?.setErrors({ email: true });
    expect(component.getEmailErrorMessage()).toBe('Veuillez saisir un email  valide');
  });

  it('should return correct message error messages', () => {
    const messageControl = component.contactForm.get('message');

    messageControl?.setErrors({ required: true });
    expect(component.getMessageErrorMessage()).toBe('Vous devez entrer un message');

    const longMessage = 'a'.repeat(301);
    messageControl?.setValue(longMessage);
    messageControl?.setErrors({ maxlength : true});
    expect(component.getMessageErrorMessage()).toBe('Le message ne doit pas dépasser 300 caractères');
  });

  it('should get message length', () => {
    component.contactForm.get('message')?.setValue('Hello');
    expect(component.getMessageLength()).toBe(5);
  });

  it('should not submit invalid form', () => {
    spyOn(component.contactForm, 'markAllAsTouched');

    component.onSubmit();

    expect(component.contactForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.isSubmitting).toBeFalsy();
  });

  it('should submit valid form', (done) => {
    component.contactForm.setValue({
      email: 'test@example.com',
      message: 'Test message'
    });

    component.onSubmit();
    expect(component.isSubmitting).toBeTruthy();

    // Wait for async operation
    setTimeout(() => {
      expect(component.isSubmitting).toBeFalsy();
      done();
    }, 1100);
  });
});


