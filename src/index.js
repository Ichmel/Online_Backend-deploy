import 'dotenv/config';
import path from 'path'; // Import the 'path' module
import { db } from './models';
import { restRouter } from './api';
import config from './config';
import appManager from './app';
import './errors';
import scheduler from './scheduler';
import cors from 'cors';
global.appRoot = path.resolve(__dirname);

const PORT = config.app.port;
const app = appManager.setup(config);

/*cors handling*/
app.use(cors({
	origin:true,
    credentials:true
}));
app.options('*', cors());

app.use(cors());

/* Route handling */
app.use('/api', restRouter);
 //app.use('/api', webRouter);

 app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
	next(new RequestError('Invalid route', 404));
});

app.use((error, req, res, next) => {
	if (!(error instanceof RequestError)) {
		error = new RequestError('Some Error Occurred', 500, error.message);
	}
	error.status = error.status || 500;
	res.status(error.status);
	let contype = req.headers['content-type'];
	var json = !(!contype || contype.indexOf('application/json') !== 0);
	if (json) {
		return res.json({ errors: error.errorList });
	} else {
		res.render(error.status.toString(), { layout: null });
	}
});

/* Database Connection */
db.sequelize
	.authenticate()
	.then(function () {
		console.log('Nice! Database looks fine');
		scheduler.init();
	})
	.catch(function (err) {
		console.log(err, "Something went wrong with the Database Update!");
	});

/* Start Listening service */
app.listen(PORT, () => {
	console.log(`Server is running at PORT http://localhost:${PORT}`);
});
