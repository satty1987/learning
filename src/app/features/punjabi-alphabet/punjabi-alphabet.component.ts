import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SpeechService } from '../../core/services/speech.service';
import { MetaTagsService } from '../../core/services/meta-tags.service';
import { MetaConfig, WebApplicationSchema } from '../../core/models/app.model';

interface Letter {
    gurmukhi: string;
    transliteration: string;
    pronunciation: string;
    example: string;
}


@Component({
    selector: 'app-punjabi-alphabet',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './punjabi-alphabet.component.html',
    styleUrls: ['./punjabi-alphabet.component.css']
})
export class PunjabiAlphabetComponent  {
alphabet: Letter[] = [
    { gurmukhi: 'ੳ', transliteration: 'ura', pronunciation: 'u-ra', example: 'ਉੱਲੂ (ullu - owl)' },
    { gurmukhi: 'ਅ', transliteration: 'airā', pronunciation: 'ai-ra', example: 'ਅੰਬ (amb - mango)' },
    { gurmukhi: 'ੲ', transliteration: 'īṛī', pronunciation: 'ee-ri', example: 'ਇੱਕ (ikk - one)' },
    { gurmukhi: 'ਸ', transliteration: 'sassā', pronunciation: 'sus-sa', example: 'ਸੇਬ (seb - apple)' },
    { gurmukhi: 'ਹ', transliteration: 'hāhā', pronunciation: 'ha-ha', example: 'ਹਾਥੀ (hathi - elephant)' },
    { gurmukhi: 'ਕ', transliteration: 'kakkā', pronunciation: 'kuk-ka', example: 'ਕਮਲ (kamal - lotus)' },
    { gurmukhi: 'ਖ', transliteration: 'khakkhā', pronunciation: 'khuk-kha', example: 'ਖਰਗੋਸ਼ (khargosh - rabbit)' },
    { gurmukhi: 'ਗ', transliteration: 'gaggā', pronunciation: 'gug-ga', example: 'ਗਾਜਰ (gajar - carrot)' },
    { gurmukhi: 'ਘ', transliteration: 'ghaghā', pronunciation: 'ghugh-gha', example: 'ਘਰ (ghar - house)' },
    { gurmukhi: 'ਙ', transliteration: 'ṅaṅṅā', pronunciation: 'ngung-nga', example: 'ਅੰਗ (ang - body part)' },
    { gurmukhi: 'ਚ', transliteration: 'caccā', pronunciation: 'chuch-cha', example: 'ਚੰਦਰਮਾ (chandrama - moon)' },
    { gurmukhi: 'ਛ', transliteration: 'chacchā', pronunciation: 'chhuch-chha', example: 'ਛੱਤਰੀ (chhatri - umbrella)' },
    { gurmukhi: 'ਜ', transliteration: 'jajjā', pronunciation: 'juj-ja', example: 'ਜਲ (jal - water)' },
    { gurmukhi: 'ਝ', transliteration: 'jhajjhā', pronunciation: 'jhujh-jha', example: 'ਝੰਡਾ (jhanda - flag)' },
    { gurmukhi: 'ਞ', transliteration: 'ñañña', pronunciation: 'nyuny-nya', example: 'ਞਾਣ (nyan - knowledge)' },
    { gurmukhi: 'ਟ', transliteration: 'ṭaṭṭā', pronunciation: 'tut-ta', example: 'ਟੋਪੀ (topi - hat)' },
    { gurmukhi: 'ਠ', transliteration: 'ṭhaṭṭhā', pronunciation: 'thuth-tha', example: 'ਠੰਡਾ (thanda - cold)' },
    { gurmukhi: 'ਡ', transliteration: 'ḍaḍḍā', pronunciation: 'dud-da', example: 'ਡੰਡਾ (danda - stick)' },
    { gurmukhi: 'ਢ', transliteration: 'ḍhaḍḍhā', pronunciation: 'dhudh-dha', example: 'ਢੋਲ (dhol - drum)' },
    { gurmukhi: 'ਣ', transliteration: 'ṇaṇṇā', pronunciation: 'nun-na', example: 'ਗਾਣਾ (gana - song)' },
    { gurmukhi: 'ਤ', transliteration: 'tattā', pronunciation: 'tut-ta', example: 'ਤਰਬੂਜ (tarbooj - watermelon)' },
    { gurmukhi: 'ਥ', transliteration: 'thatthā', pronunciation: 'thuth-tha', example: 'ਥੈਲਾ (thaila - bag)' },
    { gurmukhi: 'ਦ', transliteration: 'daddā', pronunciation: 'dud-da', example: 'ਦਰਵਾਜ਼ਾ (darwaza - door)' },
    { gurmukhi: 'ਧ', transliteration: 'dhaddhā', pronunciation: 'dhudh-dha', example: 'ਧਰਤੀ (dharti - earth)' },
    { gurmukhi: 'ਨ', transliteration: 'nannā', pronunciation: 'nun-na', example: 'ਨਦੀ (nadi - river)' },
    { gurmukhi: 'ਪ', transliteration: 'pappā', pronunciation: 'pup-pa', example: 'ਪਾਣੀ (pani - water)' },
    { gurmukhi: 'ਫ', transliteration: 'phapphā', pronunciation: 'phup-pha', example: 'ਫੁੱਲ (phull - flower)' },
    { gurmukhi: 'ਬ', transliteration: 'babbā', pronunciation: 'bub-ba', example: 'ਬੱਕਰੀ (bakri - goat)' },
    { gurmukhi: 'ਭ', transliteration: 'bhabbhā', pronunciation: 'bhubh-bha', example: 'ਭਾਲੂ (bhalu - bear)' },
    { gurmukhi: 'ਮ', transliteration: 'mammā', pronunciation: 'mum-ma', example: 'ਮੋਰ (mor - peacock)' },
    { gurmukhi: 'ਯ', transliteration: 'yayyā', pronunciation: 'yuy-ya', example: 'ਯੋਧਾ (yodha - warrior)' },
    { gurmukhi: 'ਰ', transliteration: 'rarā', pronunciation: 'rur-ra', example: 'ਰੱਖ (rakh - tree)' },
    { gurmukhi: 'ਲ', transliteration: 'lallā', pronunciation: 'lul-la', example: 'ਲੱਕੜ (lakkar - wood)' },
    { gurmukhi: 'ਵ', transliteration: 'vavvā', pronunciation: 'vuv-va', example: 'ਵਾਲ (val - hair)' },
    { gurmukhi: 'ੜ', transliteration: 'ṛaṛā', pronunciation: 'rur-ra', example: 'ਤੜਕਾ (tarka - tempering)' }
  ];

  activeLetter: string | null = null;

  constructor(
    private router: Router,
    private speechService: SpeechService,
    private metaService: MetaTagsService
  ) {

    const metaTags: MetaConfig = {
      title: 'Tap & Learn ABC - Kids Learning App',
      description: 'Tap any letter to hear it and see playful animations — learn the alphabet interactively!',
      keywords: 'tap abc, abc tap, alphabet game, kids learning, interactive alphabet',
      image: 'https://yourapp.com/assets/abc-tap-preview.jpg',
      url: 'https://yourapp.com/abc-tap',
      type: 'website'
    };

    const schema: WebApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Tap & Learn ABC - Kids Learning App",
      "description": "Tap letters to hear sounds and learn alphabet with interactive animations.",
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

  onLetterTap(item: Letter): void {
    this.activeLetter = item.gurmukhi;
    this.speechService.speak(`${item.transliteration}`);
    
    // Remove active state after animation
    setTimeout(() => {
      this.activeLetter = null;
    }, 500);
  }

  isActive(letter: string): boolean {
    return this.activeLetter === letter;
  }
}