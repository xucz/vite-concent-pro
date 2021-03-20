import { run } from 'concent';
import models from '../models';
import * as msgService from 'services/message';

// load all models by concent.run api
run(models, {
  errorHandler: (err) => {
    msgService.error(err.message);
  },
  alwaysRenderCaller: true,
  isStrict: true,
});
