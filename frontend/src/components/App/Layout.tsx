import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from '../../redux/reducers/reducers';
import ActionsNotifier from '../common/ActionsNotifier';
import AlertNotification from '../common/AlertNotification';
import Sidebar, { drawerWidthClosed, NavigationTabs } from '../Sidebar';
import RouteSwitcher from './RouteSwitcher';
import TopBar from './TopBar';
import VersionDialog from './VersionDialog';

const useStyle = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    marginLeft: 'initial',
    [theme.breakpoints.only('sm')]: {
      marginLeft: drawerWidthClosed,
    },
  },
  toolbar: theme.mixins.toolbar,
  // importing visuallyHidden has typing issues at time of writing.
  // import { visuallyHidden } from '@mui/utils';
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
  },
  wrapper: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
}));

export interface LayoutProps {}

export default function Layout({}: LayoutProps) {
  const classes = useStyle();
  const arePluginsLoaded = useTypedSelector(state => state.ui.pluginsLoaded);

  const { t } = useTranslation('frequent');
  return (
    <>
      <Link href="#main" className={classes.visuallyHidden}>
        {t('Skip to main content')}
      </Link>
      <Box className={classes.wrapper}>
        <VersionDialog />
        <CssBaseline />
        <TopBar />
        <Sidebar />
        <main id="main" className={classes.content}>
          <AlertNotification />
          <Box p={[0, 3, 3]}>
            <div className={classes.toolbar} />
            <Container maxWidth="lg">
              <NavigationTabs />
              {arePluginsLoaded && <RouteSwitcher />}
            </Container>
          </Box>
        </main>
        <ActionsNotifier />
      </Box>
    </>
  );
}
