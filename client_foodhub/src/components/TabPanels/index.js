import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minWidth: 200,
    },
}));

const getTabId = index => `vertical-tab-${index}`;
const getTabPanelId = index => `vertical-tabpanel-${index}`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Container
            fixed
            role="tabpanel"
            hidden={value !== index}
            id={getTabPanelId(index)}
            {...other}
        >
            {value === index && children}
        </Container>
    );
}

export default function TabPanels({ panels, footer }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (_e, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
            >
                {panels.map(({ label }, index) => (
                    <Tab key={index} label={label} id={getTabId(index)} />
                ))}
            </Tabs>
            {panels.map(({ component }, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {component}
                </TabPanel>
            ))}
            {footer}
        </div>
    );
}
