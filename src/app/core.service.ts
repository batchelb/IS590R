import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CoreService {
  userId;
  window:any = window;
  news:any = [];
  constructor(private http: HttpClient) {
    this.userId = Math.floor(Math.random() * 1000000);
  }


  getNews(endpoint, category, country) {
  (endpoint === 'top-headlines' ?  this.http.get(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=d9e3106bbe1a45d3b88cef653dbf664e`)
    : this.http.get(`https://newsapi.org/v2/everything?q=${category}&apiKey=d9e3106bbe1a45d3b88cef653dbf664e`)).subscribe((response:any) => {
      this.news = response.articles.map((article)=>{
        article.content = article.content ? article.content.substring(0,article.content.length -14) : '';
        return article;
      });
    });

  }

}
