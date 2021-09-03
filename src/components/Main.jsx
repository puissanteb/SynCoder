import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import {
    CssBaseline,
    Drawer,
    Box,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    Badge,
    Container,
    Grid,
    Link,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { mainListItems, secondaryListItems } from '../utils/listItems'
import styles from '../utils/useStyles'
import Post from './Post'
import { Copyright } from '../utils/utils'

const useStyles = makeStyles(styles())

export default function Main() {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }
    const posts = [
        {
            user: '조영록',
            content:
                '데이터는 React 컴포넌트가 살아 존재하게 하는 생명력과 같습니다. 앞에서 만든 조리법🧑‍🍳 사용자 인터페이스는 조리법 배열이 없으면 쓸모가 없습니다. 재료와 명확한 절차가 들어 있는 조리법은 조리법 앱이 쓸모 있게 해 줍니다. 사용자 인터페이스는 콘텐츠 생산자가 콘텐츠를 만들어내기 위해 사용하는 도구입니다. 콘텐츠 생산자에게 최선의 도구를 만들어내기 위해서는 데이터를 효율적으로 조작하고 변경하는 방법을 알아야 합니다. 앞에서는 컴포넌트 트리🌳를 만들었습니다. 컴포넌트 트리는 프로퍼티를 통해 데이터가 흘러갈 수 있는 컴포넌트 계층 구조를 뜻합니다. 프로퍼티(프롭)는 전체 그림에서 절반에 불과합니다. 상태(state)가 나머지 절반입니다. React 애플리케이션의 상태는 데이터에 의해 조종되며 변경될 수 있습니다. 상태를 조리법 애플리케이션에 도입하면 세프가 새 조리법을 만들 수도 있고, 기존 조리법을 변경하거나 오래된 조리법을 제거할 수도 있습니다.',
        },
        {
            user: '이정주',
            content:
                '먼저 배열의 구조 분해에서 setColors 변수를 추가합니다. useState가 반환하는 배열의 두 번째 인자가 상태를 변경할 때 쓸 수 있는 함수라는 점을 기억하고 계시죠? ColorList가 onRemoveColor 이벤트를 발생시키면, 이벤트의 인자로부터 색의 id를 얻어서 색 목록에 있는 색 중에 사용자가 제거하고 싶은 색을 filter로 걸러냅니다. 그 후 상태를 변경합니다. setColors() 함수를 사용해 사용자가 선택한 색을 제외한 색으로 이뤄진 배열로 상태를 변경합니다. 앞에서는 컴포넌트 트리🌳를 만들었습니다. 컴포넌트 트리는 프로퍼티를 통해 데이터가 흘러갈 수 있는 컴포넌트 계층 구조를 뜻합니다. 프로퍼티(프롭)는 전체 그림에서 절반에 불과합니다. 상태(state)가 나머지 절반입니다. React 애플리케이션의 상태는 데이터에 의해 조종되며 변경될 수 있습니다. 상태를 조리법 애플리케이션에 도입하면 세프가 새 조리법을 만들 수도 있고, 기존 조리법을 변경하거나 오래된 조리법을 제거할 수도 있습니다.',
        },
        {
            user: '남창균',
            content:
                '모든 컴포넌트에 상태를 넣는 것은 좋은 생각이 아닙니다. 상태 데이터가 너무 많은 컴포넌트에 분산되면 버그를 추적하거나 애플리케이션의 기능을 변경하기가 어려워집니다. 이런 일이 어려워지는 이유는 컴포넌트 트리에서 어느 부분에 상태가 존재하는지를 제대로 알기 어려워지기 때문입니다. 애플리케이션의 상태나 어떤 특성의 상태를 한곳에서 관리할 수 있으면 상태를 이해하기가 더 쉬워집니다. 상태를 한곳에서 관리하는 방법이 몇 가지 있습니다. 그 중 우리가 처음 살펴볼 것은 상태를 컴포넌트 트리에 전달하고, 자식 컴포넌트들에게 프롭(props)으로 전달하는 방법입니다. 이 페이지에서는 상태를 도입함으로써 애플리케이션에 생명을 불어넣습니다. 상태가 있는 컴포넌트를 만드는 방법을 배우고, 컴포넌트 트리의 아래 방향으로 상태를 전달하는 방법과 사용자 상호작용을 컴포넌트 트리의 위쪽으로 돌려보내는 방법을 살펴봅니다. 사용자로부터 폼 데이터를 얻는 기술도 배웁니다. 그리고 상태가 있는 콘텍스트 프로바이더(stateful context provider)를 통해 애플리케이션에서 관심사를 분리하는 방법에 대해 살펴봅니다.',
        },
    ]

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {posts.map((post) => (
                            <Post {...post} />
                        ))}
                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    )
}
