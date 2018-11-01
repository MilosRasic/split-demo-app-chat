import React from 'react';
import propTypes from 'prop-types';

import { AppContainer } from '@split-demo/shared-components';

import Chat from './Chat';

const pageComponents = {
	Chat,
};

export default function App({ app, apps }) {
	//memoized
	const { pageRoutes } = generatePageRoutesAndNavItems(app, pageComponents);

	return (
		<AppContainer
			app={app}
			apps={apps}
			pageRoutes={pageRoutes}
			key={app.path}
		/>
	);
}

App.propTypes = {
	app: propTypes.object,
	apps: propTypes.arrayOf(propTypes.object),
};
