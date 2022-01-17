import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME } from '../../config';
import parse from "html-react-parser"
import moment from 'moment';
import Card from '../../components/blog/Card';
import React from 'react';

const Tag = ({ tag, blogs }) => {
    return (
        <React.Fragment>
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                                {blogs.map((b, i) => (
                                    <div>
                                        <Card key={i} blog={b} />
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Tag.getInitialProps = ({ query }) => {
    return singleTag(query.slug).then(data => {
    console.log("🚀 ~ file: [slug].js ~ line 37 ~ returnsingleTag ~ data", data)
        
        if (data.error) {
            console.log(data.error);
        } else {
            return { tag: data.tag, blogs: data.blogs };
        }
    });
};

export default Tag;