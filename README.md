<div align="center">
  <a href="#">
    <img src="./src/assets/images/logo-lg.png" alt="Logo" width="140" height="80">
  </a>

  <h3 align="center">CMS Dashboard Mediverse</h3>

  <p align="center">
    An repository for CMS Mediverse project.
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://www.figma.com/file/ZNVhxs1Unym5JHPjkuDQZT/Lo-Fi-Design-Mediverse?node-id=487%3A20508">Lo-Fi Design</a>
  </p>
</div>
<div align="center">

  [![Coverage](https://sq.digital-healthcare.id/api/project_badges/measure?project=cms-dashboard&metric=coverage&token=db8e08465e5ce4c95e3b0297bf066f6241c5bd69)](https://sq.digital-healthcare.id/dashboard?id=cms-dashboard)
  [![Bugs](https://sq.digital-healthcare.id/api/project_badges/measure?project=cms-dashboard&metric=bugs&token=db8e08465e5ce4c95e3b0297bf066f6241c5bd69)](https://sq.digital-healthcare.id/dashboard?id=cms-dashboard)
  [![Quality Gate Status](https://sq.digital-healthcare.id/api/project_badges/measure?project=cms-dashboard&metric=alert_status&token=db8e08465e5ce4c95e3b0297bf066f6241c5bd69)](https://sq.digital-healthcare.id/dashboard?id=cms-dashboard)
  [![Vulnerabilities](https://sq.digital-healthcare.id/api/project_badges/measure?project=cms-dashboard&metric=vulnerabilities&token=db8e08465e5ce4c95e3b0297bf066f6241c5bd69)](https://sq.digital-healthcare.id/dashboard?id=cms-dashboard)
  [![Security Rating](https://sq.digital-healthcare.id/api/project_badges/measure?project=cms-dashboard&metric=security_rating&token=db8e08465e5ce4c95e3b0297bf066f6241c5bd69)](https://sq.digital-healthcare.id/dashboard?id=cms-dashboard)

</div>

## Install

```bash
1. clone this repo
2. cd to repo
3. copy .env-staging.example to .env and add the value on that.
4. yarn install
```

## Architecture

```text
src/
├───assets/               assets such as images, css, fonts and more.
│
├───client/               contains all the endpoints.
|      └──services.ts     contains axios instance.
|
├───components/           universal components.
│
├───constans/             contains all types.
|
├───pages/                pages view.
│
├───routes/
│   |──routes.tsx          views router config.
|   └──protect             protect route 
│
├───store/                 store .
│   └──app.store.tsx     
│
├───utils/                 contains all reusable function. 
│
├───App.tsx
|
└───index.tsx
```

## Git usage guidelines
### Git Message

1) start with prefix [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum], in the body put the issue ID, followed by colon
2) describing the key change introduced by commit
3) limit the subject line to 50 characters
4) if necessary, add the body part to describe the details

```
Examples:
feat(t1586): add .gitignore
fix(t5187): fix container page add user.
```

consider adding the corresponding check for commit message integrity as a step for CI pipeline
Reference: https://chris.beams.io/posts/git-commit/

### Branch Naming
- branch should contain the ID of issue answered (for Jira integration)
- branches based on stories/tasks should start with `feature/` prefix (so that only 'build' CI step is passed)
- branches fixing the bugs have specific `bugfix/` prefix (for them only `build` CI step is passed as well)
- branches resolving issues should start with `hotfix/` prefix (so that both 'build' and 'deploy' CI steps are passed)
- team should follow the same naming standard to make the git log readable and predictable

- prefer short branch names, starting with either `feature/`, `bugfix` or `hotfix/` prefixes, followed by issue IDs:
```
Ex:
feature/T4242
bugfix/T1111
hotfix/T2222
```
## Merge Request
Merge request title must follow convention. No. Ticket - Title ticket or Short description.E
Example: T12345 - Add login page

For merge request description please use merge request template and fill the section properly.

## Code Convention

## Styling
For styling please use tailwind and create a file to store css and use BEM http://getbem.com/introduction/ style for name convention.

For use name style please use package `classnames`, for example :
```
import cx from 'classname';

 <div
    className={cx('sidebar-container', {
      'w-64': isCollapse,
      'w-20': !isCollapse,
    })}
  >
    ...
</div>
```

## Routes
In case we need to add route or update route we need to make sure update on this file :
```
- Constants.ts -> Handle the all constants route
- home.routes.ts -> Handle list authentication of all route in dashboard
- routes.tsx -> Handle mapping url to elements / components

```
