import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LINKS } from './resource.constant';

interface ResourceLink {
  href: string;
  text: string;
}

interface CrawlData {
  links: ResourceLink[];
}

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  resources: ResourceLink[] = LINKS;


  constructor( private router: Router) {}

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  trackByLink(_index: number, link: ResourceLink): string {
    return link.href;
  }
}
