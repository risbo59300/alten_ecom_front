import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private formBulder : FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBulder.group({
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true ;

      setTimeout(() => {
        this.isSubmitting = false;

        // Afficher le message de succès
        this.snackBar.open('Votre message a été envoyé avec succès !', 'Fermer', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });

        // Réinitialiser le formulaire
        this.contactForm.reset();

        // Remmetre les champs en état pristine
        Object.keys(this.contactForm.controls).forEach(key => {
          this.contactForm.get(key)?.setErrors(null) ;
        });
      }, 1000);
    } else {
      // Marquer tous les champs comme "touched" pour afficher les erreurs de validation
      this.contactForm.markAllAsTouched() ;
    }
  }

  getEmailErrorMessage(): string {
    const emailControl = this.contactForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Vous devez entrer une adresse email' ;
    }
    if (emailControl?.hasError('email')) {
      return 'Veuillez saisir un email  valide' ;
    }
    return '' ;
  }

  getMessageErrorMessage(): string {
    const messageControl = this.contactForm.get('message');
    if (messageControl?.hasError('required')) {
      return 'Vous devez entrer un message' ;
    }
    if (messageControl?.hasError('maxLength')) {
      return 'Le message ne doit pas dépasser 300 caractères' ;
    }
    return '' ;
  }

  getMessageLength(): number {
    return this.contactForm.get('message')?.value.length || 0 ;
  }

}
