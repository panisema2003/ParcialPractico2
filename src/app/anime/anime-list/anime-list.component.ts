import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css'],
})
export class AnimeListComponent implements OnInit {
  selectedBAnime!: Anime;
  selected = false;
  animes: Array<Anime> = [];
  promedio = 0;
  totalEpisodios = 0;
  constructor(private animeService: AnimeService) {}

  getAnimes(): void {
    this.animeService.getAnimes().subscribe((animes) => {
      this.animes = animes;
    });
  }

  calcRatProm(): void {
    const total = this.animes.reduce((sum, anime) => sum + anime.Rating, 0);
    if (this.animes.length > 0) {
      this.promedio = total / this.animes.length;
    }
  }

  calcTotalEpisodios(): void {
    this.animes.forEach((anime) => {
      this.totalEpisodios = this.totalEpisodios + anime.Rating;
    });
  }

  onSelected(anime: Anime): void {
    this.selected = true;
    this.selectedBAnime = anime;
  }

  ngOnInit() {
    this.getAnimes();
    this.calcRatProm();
    this.calcTotalEpisodios();
  }
}
