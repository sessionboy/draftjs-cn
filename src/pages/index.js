/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import Layout from '@theme/Layout';

import classnames from 'classnames';

import DraftEditorExample from '../components/DraftEditorExample';
import styles from './styles.module.css';

/** Won't render children on server */
function ClientOnly({children, fallback}) {
  if (typeof window === 'undefined') {
    return fallback || null;
  }
  return children;
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;

  return (
    <Layout permalink="/" description={siteConfig.tagline}>
      <div className="hero hero--primary shadow--lw">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="hero__title">{siteConfig.title}</h1>
              <p className="hero__subtitle">{siteConfig.tagline}</p>
              <div>
                <Link
                  className="button button--secondary button--lg"
                  to={useBaseUrl('docs/getting-started')}>
                  入门指南
                </Link>
              </div>
            </div>
            <div className="col text--center">
              <img
                className={styles.demoGif}
                src={useBaseUrl('/img/demo.gif')}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="margin-vert--xl">
          <div className="row">
            <div className="col">
              <h3>可扩展和可定制</h3>
              <p>
              我们提供了构建基础，以使您能够创建从基本文本样式到嵌入式媒体的各种丰富的富文本撰写体验。
              </p>
            </div>
            <div className="col">
              <h3>声明式富文本</h3>
              <p>
              Draft.js无缝适合React应用程序，使用熟悉的声明性API提取渲染，选择和输入行为的细节。
              </p>
            </div>
            <div className="col">
              <h3>不变的编辑器状态</h3>
              <p>
                Draft.js模型是使用
                <a
                  href="https://immutable-js.github.io/immutable-js/"
                  target="_blank"
                  rel="noreferrer noopener">
                  immutable-js
                </a>
                构建的，提供具有功能状态更新的API，并积极利用数据持久性来实现可扩展的内存使用。                
              </p>
            </div>
          </div>
        </div>
        <div
          className={classnames(
            'row',
            'margin-vert--xl',
            styles.hideOnTabletAndSmaller,
          )}>
          <ClientOnly fallback={null}>
            <div className="col col--6 col--offset-3">
              <h2>试试看！</h2>
              <p>
              这是一个用Draft.js构建的富文本编辑器的简单示例。
              </p>
              <div id="rich-example">
                <DraftEditorExample />
              </div>
            </div>
          </ClientOnly>
        </div>
        <div className="margin-vert--xl text--center">
          <Link
            className="button button--primary button--lg"
            to={useBaseUrl('docs/getting-started')}>
            了解更多有关Draft.js的信息
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
