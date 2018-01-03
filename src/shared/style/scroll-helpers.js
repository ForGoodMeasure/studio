let scroll, page;
if (typeof window !== 'undefined') {
  scroll = require('scroll');
  page = require('scroll-doc')()
}

export const scrollLimit = limit => () => window.scrollY < limit;
export const scrollMin = limit => () => window.scrollY > limit;

export const scrollToTop = () => {
  scroll.top(page, 0);
}

export const scrollTo = offset => {
  console.log(offset);
  scroll.top(page, offset, (err, scrollTop) => {
    console.log(err, scrollTop);
  })
}
