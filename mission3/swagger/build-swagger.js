import { resolveRefs } from 'json-refs';
import YAML from 'js-yaml';
import fs from 'fs';

const root = YAML.load(
  fs.readFileSync('./swagger/api-docs/openapi-base.yaml', 'utf8')
);

const options = {
  location: './swagger/api-docs/openapi-base.yaml',
  loaderOptions: {
    processContent: (res, callback) => {
      callback(null, YAML.load(res.text));
    }
  }
};

resolveRefs(root, options)
  .then((results) => {
    fs.writeFileSync(
      './src/docs/openapi-resolved.json',
      JSON.stringify(results.resolved, null, 2),
      'utf8'
    );
    console.log('openapi-resolved.json 생성 완료');
  })
  .catch((err) => {
    console.error('openapi-resolved.json 생성 실패:', err);
  });
