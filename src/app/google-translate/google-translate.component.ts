import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-google-translate',
	standalone: true,
	imports: [],
	templateUrl: './google-translate.component.html',
	styleUrl: './google-translate.component.css'
})
export class GoogleTranslateComponent {
	constructor(private renderer: Renderer2) {}

	ngOnInit(): void {
	  this.addGoogleTranslateScript();
	}
  
	addGoogleTranslateScript() {
	  const script = this.renderer.createElement('script');
	  script.src = 'https://translate.google.com/translate_a/element.js?cb=initTranslateElement';
	  script.type = 'text/javascript';
	  script.async = true;
	  this.renderer.appendChild(document.body, script);
  
	  // Add global function on window to initialize Google Translate
	  (window as any).initTranslateElement = () => {
		this.waitForTranslate().then(() => {
		  new (window as any).google.translate.TranslateElement(
			{ pageLanguage: '', includedLanguages: 'en,mr,hi,kn' },
			'google_translate_element'
		  );
		});
	  };
	}
  
	// Wait for the google translate library to be available
	waitForTranslate(): Promise<void> {
	  return new Promise((resolve) => {
		const checkGoogleTranslate = () => {
		  if ((window as any).google && (window as any).google.translate) {
			resolve();
		  } else {
			setTimeout(checkGoogleTranslate, 100);
		  }
		};
		checkGoogleTranslate();
	  });
	}
}
