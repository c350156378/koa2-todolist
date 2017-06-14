import { Koa2BlogPage } from './app.po';

describe('koa2-blog App', () => {
  let page: Koa2BlogPage;

  beforeEach(() => {
    page = new Koa2BlogPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
