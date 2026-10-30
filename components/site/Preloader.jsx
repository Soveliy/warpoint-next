import { siteFields } from '../../lib/site-fields';

export default function Preloader({ site }) {
  const fields = siteFields(site);
  return (
    <>
      <div className="preloader" data-preloader="" aria-hidden="true">
        {'\n  '}
        <div className="preloader__logo" data-preloader-logo="">
          {'\n    '}
          <img
            className="preloader__outline"
            src="/img/big_logo.svg"
            width="520"
            height="88"
            alt=""
            fetchPriority="high"
          />
          {'\n    '}
          <span className="preloader__fill" data-preloader-fill="">
            {'\n      '}
            <img
              className="preloader__filled-logo preloader__filled-logo--black"
              src="/img/logo.svg"
              width="215"
              height="36"
              alt=""
              fetchPriority="high"
            />
            {'\n      '}
            <img
              className="preloader__filled-logo preloader__filled-logo--brand"
              src="/img/logo.svg"
              width="215"
              height="36"
              alt=""
              fetchPriority="high"
            />
            {'\n    '}
          </span>
          {'\n  '}
        </div>
        {'\n'}
      </div>
    </>
  );
}
