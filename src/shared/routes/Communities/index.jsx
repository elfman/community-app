/**
 * Chunk loader for communities code.
 */

import LoadingIndicator from 'components/LoadingIndicator';
import path from 'path';
import PT from 'prop-types';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { requireWeak, resolveWeak, SplitRoute } from 'utils/router';

export default function ChunkLoader({ base, communityId, meta }) {
  return (
    <SplitRoute
      cacheCss
      chunkName="communities"
      renderClientAsync={() =>
        import(
          /* webpackChunkName: "communities" */
          './Routes',
        ).then(({ default: Routes }) => (
          <Routes base={base} communityId={communityId} meta={meta} />
        ))
      }
      renderPlaceholder={() => <LoadingIndicator />}
      renderServer={(routeProps) => {
        const p = resolveWeak('./Routes');
        const Routes = requireWeak(path.resolve(__dirname, p));
        return (
          <StaticRouter
            context={routeProps.staticContext}
            location={routeProps.location.pathname}
          >
            <Routes
              base={base}
              communityId={communityId}
              meta={meta}
            />
          </StaticRouter>
        );
      }}
    />
  );
}

ChunkLoader.propTypes = {
  base: PT.string.isRequired,
  communityId: PT.string.isRequired,
  meta: PT.shape().isRequired,
};