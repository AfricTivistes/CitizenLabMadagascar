export async function navQuery() {
  const response = await fetch(import.meta.env.PUBLIC_WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
              menuItems(where: {location: GATSBY_HEADER_MENU}) {
                nodes {
                  text: label
                  parentId
                  href: uri
                  childItems {
                    nodes {
                      text: label
                      href: uri
                    }
                  }
                }
              }
            }
            `
    })
  });
  const { data } = await response.json();
  const menuItems = Object.values(data)[0].nodes.filter(node => node.parentId === null);
  return menuItems;
}

export async function getNodeByURI(uri) {
  const response = await fetch(import.meta.env.PUBLIC_WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `query GetNodeByURI($uri: String!) {
                  nodeByUri(uri: $uri) {
                    __typename
                    isContentNode
                    isTermNode
                    ... on Post {
                      id
                      title
                      date
                      permalink: uri
                      excerpt
                      content
                      categories {
                        nodes {
                          name
                          permalink: uri
                          slug
                        }
                      }
                      terms {
                        nodes {
                          name
                          slug
                          permalink:uri
                        }
                      }
                      featuredImage {
                        node {
                          srcSet
                          sourceUrl
                          altText
                          mediaDetails {
                            height
                            width
                          }
                        }
                      }
                    }
                    ... on Page {
                      id
                      title
                      permalink: uri
                      date
                      content
                      featuredImage {
                        node {
                          srcSet
                          sourceUrl
                          altText
                          mediaDetails {
                            height
                            width
                          }
                        }
                      }
                    }
                    ... on Category {
                      id
                      name
                      posts {
                        nodes {
                          date
                          title
                          excerpt
                          permalink: uri
                          categories {
                            nodes {
                              name
                              permalink: uri
                            }
                          }
                          featuredImage {
                            node {
                              srcSet
                              sourceUrl
                              altText
                              mediaDetails {
                                height
                                width
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              `,
      variables: {
        uri: uri
      }
    })
  });
  const { data } = await response.json();
  return data;
}
export async function getAllUris() {
  let allUris = [];
  let afterCursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(import.meta.env.PUBLIC_WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query GetAllUris($after: String) {
          posts(first: 50, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            nodes {
              uri
            }
          }
          pages {
            nodes {
              uri
            }
          }
        }`,
        variables: { after: afterCursor }
      })
    });

    const { data } = await response.json();
    const postsData = data?.posts;
    const pagesData = data?.pages?.nodes || [];

    if (postsData) {
      allUris = [...allUris, ...postsData.nodes, ...pagesData];
      hasNextPage = postsData.pageInfo.hasNextPage;
      afterCursor = postsData.pageInfo.endCursor;
    } else {
      hasNextPage = false;
    }
  }

  // Nettoyage des URI
  return allUris
    .filter(node => node.uri !== null)
    .map(node => {
      let trimmedURI = node.uri.substring(1);
      trimmedURI = trimmedURI.substring(0, trimmedURI.length - 1);
      return {
        params: {
          uri: decodeURI(trimmedURI)
        }
      };
    });
}


export async function findLatestPostsAPI() {
  const response = await fetch(import.meta.env.PUBLIC_WORDPRESS_API_URL, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
                  posts(first: 8) {
                    nodes {
                      date
                      permalink: uri
                      title
                      categories {
                        nodes {
                          name
                          permalink: uri
                        }
                      }
                      terms {
                        nodes {
                          name
                          slug
                        }
                      }
                      commentCount
                      excerpt
                      featuredImage {
                        node {
                          mediaItemUrl
                          altText
                        }
                      }
                    }
                  }
                }
              `
    })
  });
  const { data } = await response.json();
  return data.posts.nodes;
}
export async function newsPagePostsQuery() {
  let allPosts = [];
  let afterCursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(import.meta.env.PUBLIC_WORDPRESS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query Posts( $after: String) {
            posts(first: 50, after: $after) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                date
                permalink: uri
                title
                commentCount
                excerpt
                categories {
                  nodes {
                    name
                    permalink: uri
                  }
                }
                terms {
                  nodes {
                    name
                    slug
                    permalink: uri
                  }
                }
                featuredImage {
                  node {
                    mediaItemUrl
                    altText
                  }
                }
              }
            }
          }
        `,
        variables: { after: afterCursor }
      })
    });

    const { data } = await response.json();
    const postsData = data?.posts;

    if (postsData) {
      allPosts = [...allPosts, ...postsData.nodes]; // Ajouter les nouveaux posts à la liste
      hasNextPage = postsData.pageInfo.hasNextPage;
      afterCursor = postsData.pageInfo.endCursor;
    } else {
      hasNextPage = false; // Arrêter en cas d'erreur
    }
  }
  return allPosts;
}

export async function getAllMembers() {
  try {
    const response = await fetch(import.meta.env.PUBLIC_WORDPRESS_API_URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `{
          equipes (where: {status: PUBLISH}, first: 100) {
                  nodes {
                        featuredImage {
                              node {
                                altText
                                mediaItemUrl
                        }
                        }
                        title
                        fonctions {
                          equipe
                          fonction
                        }
                        social {
                          facebook
                          instagram
                          linkedin
                          twitter
                        }
                    }
          }
          }     
        `
      })
    });
    
    const { data } = await response.json();
    
    // Check if data.equipes exists and has nodes
    if (data && data.equipes && data.equipes.nodes) {
      return data.equipes.nodes;
    } else {
      console.error('No equipes data found in API response');
      // Return an empty array as fallback
      return [];
    }
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}
