import React from "react";
import '../css/knowledgebase.css';
import { Text, Paper, Badge, Stack, Group } from '@mantine/core';
import { IconMessage } from '@tabler/icons-react';

/**
 * Component that displays a list of articles sorted by comment count
 * @param {Array} posts - Array of post objects
 * @param {Function} onArticleClick - Callback when an article is clicked
 */
function ArticleList({ posts, onArticleClick }) {

    // Sort posts by number of comments (descending)
    const sortedPosts = [...posts].sort((a, b) => {
        const aComments = a.in_comments ? Object.keys(a.in_comments).length : 0;
        const bComments = b.in_comments ? Object.keys(b.in_comments).length : 0;
        return bComments - aComments;
    });

    const getCommentCount = (post) => {
        if (!post.in_comments) return 0;
        return Object.keys(post.in_comments).length;
    };

    return (
        <div className="article-list">
            <Text size="lg" fw={700} mb="md" className="article-list-title">
                Popular Articles
            </Text>
            <Stack gap="xs">
                {sortedPosts.map((post) => (
                    <Paper
                        key={post.title}
                        className="article-list-item"
                        p="sm"
                        radius="md"
                        withBorder
                        onClick={() => onArticleClick(post.title)}
                        style={{ cursor: 'pointer' }}
                    >
                        <Group justify="space-between" wrap="nowrap">
                            <Text size="sm" fw={500} lineClamp={2} style={{ flex: 1 }}>
                                {post.title}
                            </Text>
                            <Badge 
                                leftSection={<IconMessage size={12} />} 
                                variant="light" 
                                color="blue"
                                size="sm"
                            >
                                {getCommentCount(post)}
                            </Badge>
                        </Group>
                        {post.tags && post.tags.length > 0 && (
                            <Group gap={4} mt="xs">
                                {post.tags.slice(0, 3).map((tag, index) => (
                                    <Badge key={index} size="xs" variant="outline" color="gray">
                                        {tag}
                                    </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                    <Text size="xs" c="dimmed">+{post.tags.length - 3}</Text>
                                )}
                            </Group>
                        )}
                    </Paper>
                ))}
                {sortedPosts.length === 0 && (
                    <Text size="sm" c="dimmed" ta="center">
                        No articles yet
                    </Text>
                )}
            </Stack>
        </div>
    );
}

export default ArticleList;
