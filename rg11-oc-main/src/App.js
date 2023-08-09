import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from './components/Layout';
import AuthProvider from '~/components/Auth';
import { SocketProvider } from './providers/Socket';
import { PeerProvider } from './providers/Peer';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <SocketProvider>
                        <PeerProvider>
                            <Routes>
                                {publicRoutes.map((route, index) => {
                                    const Page = route.component;

                                    let Layout = DefaultLayout;
                                    let Auth = Fragment;

                                    if (route.layout) {
                                        Layout = route.layout;
                                    } else if (route.layout === null) {
                                        Layout = Fragment;
                                    }

                                    if (route.auth) {
                                        Auth = route.auth;
                                    } else if (route.auth) {
                                        Auth = Fragment;
                                    }
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Auth>
                                                    <Layout>
                                                        <Page />
                                                    </Layout>
                                                </Auth>
                                            }
                                        />
                                    );
                                })}
                            </Routes>
                        </PeerProvider>
                    </SocketProvider>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
