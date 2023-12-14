import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Image, Text, Badge, Group, Avatar, Container, Grid} from '@mantine/core'; //Mantine UI
import '../css/members.css';

function Member({id, first_name, last_name, email, description, avatar_img}) {

  return (
    <div className="member">
        {/* Parent of this Component should be a Grid */}
        <Grid.Col span={4} style={{maxWidth: '100%'}}>
            {/* Member Container: */}
            <Container className="member-container">
            <Card shadow="md" radius="md" withBorder className='content-container-inner' style={{padding: "25px 25px 25px 25px"}}>
                <Card.Section style={{display: "flex", justifyContent: "center"}}>
                    <Avatar size={90} src={avatar_img} alt="user's profile picture." color="red"/>
                </Card.Section>

                <Card.Section>
                    <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{`${first_name} ${last_name}`}</Text>
                    <Badge color="cyan">member</Badge>
                    </Group>
                </Card.Section>

                <Card.Section>
                    <Text mt="sm" size="sm" c="dimmed" span inherit dangerouslySetInnerHTML={{__html: description}}></Text>
                </Card.Section>

            </Card>
            </Container>
        </Grid.Col>
    </div>
  );
}

export default Member;
