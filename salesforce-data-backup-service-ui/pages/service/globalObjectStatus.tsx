import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import styles from "/styles/index.module.css"; 

const GlobalObjectStatus: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Salesforce Data Center</title>
        <meta name="description" content="Salesforce Data Center" />
        <link rel="icon" href="./public/assets/icons/utility/bucket_60.png" />
      </Head>

      <main className={styles.main}>
        <div className="slds-grid">
          <div className="slds-col  slds-size_2-of-12">
            <nav className="slds-nav-vertical" aria-label="Sub page">
              <div className="slds-nav-vertical__section">
                <div className="slds-page-header">
                  <div className="slds-page-header__row">
                    <div className="slds-page-header__col-title">
                      <div className="slds-media">
                        <div className="slds-media__body">
                          <div className="slds-page-header__name">
                            <div className="slds-page-header__name-title">
                              <h1>
                                <span
                                  className="slds-page-header__title slds-truncate"
                                  title="Salesforce Data Center"
                                >
                                  Salesforce Data Center
                                </span>
                              </h1>
                            </div>
                          </div>
                          <p className="slds-page-header__name-meta">
                            Secure your data
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 id="entity-header" className="slds-nav-vertical__title">
                  Home
                </h2>
                <ul aria-describedby="entity-header">
                  <li className="slds-nav-vertical__item ">
                    <Link href="/">
                      <a className="slds-nav-vertical__action">Home</a>
                    </Link>
                  </li>
                </ul>
                <h2 id="entity-header" className="slds-nav-vertical__title">
                  Service
                </h2>
                <ul aria-describedby="entity-header">
                  <li className="slds-nav-vertical__item slds-is-active">
                  <Link href="service/globalObjectStatus">
                    <a
                      
                      className="slds-nav-vertical__action"
                      aria-current="true"
                    >
                      Global Object Status
                    </a>
                    </Link>
                  </li>
                  <li className="slds-nav-vertical__item">
                    <a href="#" className="slds-nav-vertical__action">
                      Object Status
                    </a>
                  </li>
                  <li className="slds-nav-vertical__item">
                    <a href="#" className="slds-nav-vertical__action">
                      Sync Status
                    </a>
                  </li>
                  <li className="slds-nav-vertical__item">
                    <a href="#" className="slds-nav-vertical__action">
                      Log
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="slds-col  slds-size_10-of-12 slds-grid slds-grid_vertical">
         
              <div className="slds-page-header">
                <div className="slds-page-header__row">
                  <div className="slds-page-header__col-title">
                    <div className="slds-media">
                      <div className="slds-media__body">
                        <div className="slds-page-header__name">
                          <div className="slds-page-header__name-title">
                            <h1>
                              <span
                                className="slds-page-header__title slds-truncate"
                                title="Rohde Corp - 80,000 Widgets"
                              >
                              Global Object Sync Management
                              </span>
                            </h1>
                          </div>
                        </div>
                        <p className="slds-page-header__name-meta">
                          Manage Your org object metadata sync
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            <div className="slds-col">main</div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/sonicfurqan/salesforce-data-backup-service"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Syed Furqan Ahmed
        </a>
      </footer>
    </div>
  );
};

export default GlobalObjectStatus;
