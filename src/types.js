// @flow

import * as React from 'react';
import type {
  ActivityArgData,
  ActivityResponse,
  StreamUserSession,
  ReactionKindMap,
  UserResponse,
  ReactionRequestOptions,
  EnrichedReactionResponse,
  OgData as OgDataGetStream,
} from 'getstream';
import type { AppCtx, FeedCtx } from './Context';

export type FlowRequestTypes =
  | 'get-user-info'
  | 'get-feed'
  | 'get-feed-next-page'
  | 'get-reactions-next-page'
  | 'get-notification-counts'
  | 'upload-image'
  | 'add-activity'
  | 'delete-activity'
  | 'add-reaction'
  | 'delete-reaction';

export type UploadState = 'uploading' | 'finished' | 'failed';

export type FileLike = Blob | File;

export type UploadInfo = {|
  id: string,
  url?: string,
  state: UploadState,
|};

export type FileUpload = {|
  ...UploadInfo,
  file: File,
|};

export type ImageUpload = {|
  ...UploadInfo,
  file: Blob | File,
  previewUri?: string,
|};

export type ErrorHandler = (
  error: Error,
  type: FlowRequestTypes,
  details: {},
) => mixed;

type ReactComponentClass = Class<React.Component<any>>;
export type ReactComponentFunction = (
  props: any,
) => ?React.Element<any> | boolean | number | string;
export type ReactElementCreator = ReactComponentClass | ReactComponentFunction;
export type RenderableButNotElement = ?(
  | ReactElementCreator
  | boolean
  | number
  | string
);
export type Renderable = RenderableButNotElement | React.Element<any>;

export type BaseActivityResponse = ActivityResponse<{}, {}>;
export type BaseAppCtx = AppCtx<{}>;
export type BaseFeedCtx = FeedCtx;
export type BaseUserSession = StreamUserSession<{}>;

export type BaseReaction = EnrichedReactionResponse<{}, {}>;
export type BaseReactionMap = ReactionKindMap<Object, Object>;

export type BaseUserResponse = UserResponse<{}>;

export type UserData = {
  name?: string,
  profileImage?: string,
};

export type OgData = OgDataGetStream;
export type FileInfo = {
  name: string,
  url: string,
  mimeType: string,
};
export type CustomActivityData = {
  text?: string,
  link?: boolean,
  image?: string,
  attachments?: {
    images?: Array<string>,
    og?: ?OgData,
    files?: Array<FileInfo>,
  },
};

export type CustomActivityArgData = ActivityArgData<{}, CustomActivityData>;

export type ActivityData = ActivityResponse<UserData, CustomActivityData>;

export type ToggleReactionCallbackFunction = (
  kind: string,
  activity: BaseActivityResponse,
  options: { trackAnalytics?: boolean } & ReactionRequestOptions<{}>,
) => void | Promise<mixed>;

export type AddReactionCallbackFunction = (
  kind: string,
  activity: BaseActivityResponse,
  options: { trackAnalytics?: boolean } & ReactionRequestOptions<{}>,
) => void | Promise<mixed>;

export type RemoveReactionCallbackFunction = (
  kind: string,
  activity: BaseActivityResponse,
  id: string,
  options: { trackAnalytics?: boolean } & ReactionRequestOptions<{}>,
) => void | Promise<mixed>;

export type CommentData = {
  text: string,
};

export type Comment = EnrichedReactionResponse<UserData, CommentData>;

export type NotificationActivity = ActivityResponse<UserData, {}>;
export type NotificationActivities = Array<ActivityResponse<UserData, {}>>;

export type Emoji = {
  // The actual unicode emoji (e.g. 👍)
  native: string,
  // Colon representation (e.g. ":+1:")
  colons: string,
  // Colon representation (e.g. "+1")
  id: string,
  // Colon representation (e.g. Thumbs Up Sign)
  name: string,
  emoticons: Array<string>,
  skin: ?number,
  unified: string,
};
