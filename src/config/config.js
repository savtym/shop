const config = {
	apiDomain: 'http://localhost:8080',
	serverResponseStatus: {
		'401' : ['/signin']
	}
};

const configProd = {
};

const configDev = {
};




if (process.env.NODE_ENV === 'production') {
	Object.assign(config, configProd);
} else if (process.env.NODE_ENV === 'development') {
	Object.assign(config, configDev);
}

export default config;
