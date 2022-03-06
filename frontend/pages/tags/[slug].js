import Head from 'next/head';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import { DOMAIN, APP_NAME } from '../../config';
import React from 'react';
import Post from '../../components/blog/Post';

const Tag = ({ tag, blogs, query }) => {
    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Best shrimp articles on ${tag.name}`} />
            <link rel="canonical" href={`${DOMAIN}/tags/${query.slug}`} />
            <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
            <meta property="og:description" content={`Best shrimp information on ${tag.name}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/tag/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/nature.jpg`}/>
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/nature.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );
    return (
        <React.Fragment>
            {head()}
            <Layout> 
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
                                {blogs.map((b, i) => (
                                    <div>
                                        <Post key={i} blog={b} />
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
        if (data.error) {
            console.log(data.error);
        } else {
            return { tag: data.tag, blogs: data.blogs, query };
        }
    });
};

export default Tag;