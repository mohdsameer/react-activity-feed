// @flow

import React from 'react';
import Link from './Link';

export type Props = {|
  adds: Array<{}>,
  deletes: Array<{}>,
  labelSingle?: string,
  labelPlural?: string,
  onClick?: () => mixed,
|};

/**
 * Component is described here.
 *
 * @example ./examples/NewActivitiesNotification.md
 */
export default class NewActivitiesNotification extends React.Component<Props> {
  static defaultProps = {
    labelSingle: 'notification',
    labelPlural: 'notifications',
    adds: [],
    deletes: [],
  };
  render() {
    const addCount = this.props.adds.length;
    const count = addCount;
    if (count === 0) {
      return null;
    }

    return (
      <button
        className="raf-new-activities-notification"
        type="button"
        onClick={this.props.onClick}
      >
        <Link>
          {count} new{' '}
          {count !== 1 ? this.props.labelPlural : this.props.labelSingle}
        </Link>
      </button>
    );
  }
}
