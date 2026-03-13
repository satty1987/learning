import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';
import { FormsModule } from '@angular/forms';


interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
}

@Component({
  selector: 'app-text-learning',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-learning.component.html',
  styleUrls: ['./text-learning.component.css']
})
export class TextLearningComponent implements OnInit {
 
inputText: string = 'Sirjan';
  constructor(
    private router: Router,
    private speechService: SpeechService,
    private metaService: MetaTagsService,
  ) { }

  ngOnInit(): void {
    const metaTags: MetaConfig = {
      title: 'Learn ABC - Kids Learning App',
      description: 'Interactive alphabet learning for kids. Learn letters A-Z with fun animations and sounds.',
      keywords: 'abc learning, alphabet, kids education, learning app',
      image: 'https://yourapp.com/assets/abc-preview.jpg',
      url: 'https://yourapp.com/abc',
      type: 'website'
    }
    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Kids Learning App",
      "description": "Educational app for children",
      "applicationCategory": "EducationalApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };
    this.metaService.injectMetaTags(metaTags, schema);
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  
  sayLetter(): void {
    this.speechService.speak(`${this.inputText}`);
  }

}
