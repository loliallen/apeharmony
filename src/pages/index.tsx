import { Switch, Route } from 'react-router'
import { MainPage } from './MainPage'
import { LegalPage } from './LegalPage'
import { PPLPage } from './PPLPage'

export const Pages = () => {
    return (
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/ppl" component={PPLPage}/>
            <Route exact path="/legal" component={LegalPage}/>
        </Switch>
    )
}
