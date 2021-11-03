import { Switch, Route } from 'react-router'
import { MainPage } from './MainPage'
import { LegalPage } from './LegalPage'

export const Pages = () => {
    return (
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/legal" component={LegalPage}/>
        </Switch>
    )
}
