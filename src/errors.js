// @flow

import type { FlowRequestTypes } from './types';
import stream from 'getstream';
export const handleError = (
  error: Error,
  type: FlowRequestTypes,
  detail: Object,
) => {
  console.warn(error);
  alert(getErrorMessage(error, type, detail));
};

export const getErrorMessage = (
  error: Error,
  type: FlowRequestTypes,
  detail: Object,
): string => {
  console.warn(error);
  if (!(error instanceof stream.errors.StreamApiError)) {
    return fallbackErrorMessage(error, type, detail);
  }
  const response = error.response;

  if (!response.statusCode || !response.body || !response.body.detail) {
    return fallbackErrorMessage(error, type, detail);
  }
  const statusCode = response.statusCode;
  const text = response.body.detail;

  /* eslint-disable no-magic-numbers */
  if (statusCode >= 400 && statusCode < 500) {
    return text;
  } else if (statusCode >= 500 && statusCode < 600) {
    return text;
  }
  /* eslint-enable no-magic-numbers */

  return fallbackErrorMessage(error, type, detail);
};

export const fallbackErrorMessage = (
  error: Error,
  type: FlowRequestTypes,
  detail: Object,
): string => {
  let text = 'Something went wrong';
  let suffix = '';
  switch (type) {
    case 'get-user-info':
      text += ' when loading user info';
      break;
    case 'get-feed':
      text += ' when loading the feed';
      break;
    case 'get-feed-next-page':
      text += ' when loading the next page of the feed';
      break;
    case 'get-notification-counts':
      text += ' when loading your unread notification counts';
      break;
    case 'upload-image':
      text += ' when uploading your image';
      suffix = ' If it is, the image is probably too big';
      break;
    case 'add-activity':
      text += ' when submitting your post';
      break;
    case 'add-reaction':
      text += ' when submitting your ' + detail.kind;
      break;
    case 'delete-reaction':
      text += ' when removing your ' + detail.kind;
      break;
    default:
  }

  text += '. Is your internet working?' + suffix;
  return text;
};
