// @flow
import React from 'react';
import IconButton from './IconButton';
import type { OgData } from '../types';

type Props = {|
  og: OgData,
  handleClose?: (e: SyntheticEvent<>) => mixed,
|};

/**
 * Component for rendering an Youtube or Vimeo embedded player
 * @example ./examples/Video.md
 */
export default class Video extends React.Component<Props> {
  _handleClose = (e: SyntheticEvent<>) => {
    if (this.props.handleClose) {
      this.props.handleClose(e);
    }
  };

  render() {
    const { videos } = this.props.og;
    let video: {
      video?: string,
      secure_url?: string,
      type?: string,
      width?: string,
      height?: string,
    } = {};

    const svg =
      '<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M465 5c5.53 0 10 4.47 10 10s-4.47 10-10 10-10-4.47-10-10 4.47-10 10-10zm3.59 5L465 13.59 461.41 10 460 11.41l3.59 3.59-3.59 3.59 1.41 1.41 3.59-3.59 3.59 3.59 1.41-1.41-3.59-3.59 3.59-3.59-1.41-1.41z" id="b"/><filter x="-30%" y="-30%" width="160%" height="160%" filterUnits="objectBoundingBox" id="a"><feOffset in="SourceAlpha" result="shadowOffsetOuter1"/><feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" in="shadowBlurOuter1"/></filter></defs><g transform="translate(-451 -1)" fill-rule="nonzero" fill="none"><use fill="#000" filter="url(#a)" xlink:href="#b"/><use fill="#FFF" fill-rule="evenodd" xlink:href="#b"/></g></svg>';

    for (let i = 0; i < videos.length; i++) {
      if (videos[i].type === 'text/html' || videos[i].type === 'video/mp4') {
        video = videos[i];
        break;
      }
    }

    if (video.type === 'text/html') {
      return (
        <div className="raf-video__frame">
          <iframe
            title={'embedded player'}
            id="ytplayer"
            type={video.type}
            width={video.width}
            height={video.height}
            src={video.secure_url || video.video}
            frameBorder="0"
          />
        </div>
      );
    } else {
      return (
        <div className="raf-video__video">
          <video className="raf-video__video--video" controls>
            <source src={video.secure_url || video.video} type={video.type} />
          </video>
          <div className="raf-video__video--content">
            <div className="raf-video__video--title">{this.props.og.title}</div>
            <div className="raf-video__video--description">
              {this.props.og.description}
            </div>
            <div className="raf-video__video--link">
              <a href={this.props.og.url} target="blank">
                {this.props.og.site_name}
              </a>
            </div>
          </div>
          {this.props.handleClose ? (
            <IconButton onClick={(e) => this._handleClose(e)}>
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </IconButton>
          ) : null}
        </div>
      );
    }
  }
}
