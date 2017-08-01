import {Component} from '@angular/core';

import {FeedService} from './feed.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss']
})
export class Feed {

  public feed: any;
  public Object: any;
  constructor(private _feedService:FeedService) {
    this.Object = Object;
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message){
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this.feed = this._feedService.getData();
    console.log(this.feed);
  }
}
