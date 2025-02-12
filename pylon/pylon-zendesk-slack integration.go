package main

import (
	"encoding/json"
	"fmt"
)

// curl 'https://graph.usepylon.com/graphql?q=getSlackZendeskUsersAndPairings' \
//  --data-raw $'{"query":"query getSlackZendeskUsersAndPairings($orgID: ID\u0021) {\\n  organization(id: $orgID) {\\n    id\\n    integrationSettings {\\n      isZendeskAutoAssignmentEnabled\\n      zendeskUserToSlackUserMap {\\n        slackUserID\\n        zendeskUserID\\n      }\\n    }\\n    slackUsers(primaryWorkspaceOnly: true, includeCustomers: true) {\\n      id\\n      name\\n      email\\n      avatarUrl\\n    }\\n    zendeskUsers {\\n      id\\n      email\\n      name\\n    }\\n  }\\n}","variables":{"orgID":"727eefc0-2d89-48d2-9a9c-5e1f446b7f1f"},"operationName":"getSlackZendeskUsersAndPairings"}'
const getRes = ``

func main() {
	type ZendeskUser struct {
		Id    string `json:"id"`
		Email string `json:"email"`
		Name  string `json:"name"`
	}
	type SlackUser struct {
		Id        string `json:"id"`
		Name      string `json:"name"`
		Email     string `json:"email"`
		AvatarUrl string `json:"avatarUrl"`
	}

	type ZendeskUserToSlackUserMap struct {
		SlackUserID   string `json:"slackUserID"`
		ZendeskUserID string `json:"zendeskUserID"`
	}

	type GetRes struct {
		Data struct {
			Organization struct {
				Id                  string `json:"id"`
				IntegrationSettings struct {
					IsZendeskAutoAssignmentEnabled bool                        `json:"isZendeskAutoAssignmentEnabled"`
					ZendeskUserToSlackUserMap      []ZendeskUserToSlackUserMap `json:"zendeskUserToSlackUserMap"`
				} `json:"integrationSettings"`
				SlackUsers   []SlackUser   `json:"slackUsers"`
				ZendeskUsers []ZendeskUser `json:"zendeskUsers"`
			} `json:"organization"`
		} `json:"data"`
	}

	var res GetRes
	err := json.Unmarshal([]byte(getRes), &res)
	if err != nil {
		fmt.Println(err)
		return
	}

	// make a lookup map for zendesk users
	zdLookup := make(map[string]ZendeskUser)
	for _, m := range res.Data.Organization.ZendeskUsers {
		zdLookup[m.Email] = m
	}
	slackLookup := make(map[string]SlackUser)
	for _, m := range res.Data.Organization.SlackUsers {
		slackLookup[m.Email] = m
	}

	// build req with a map
	zdToSlackUserMap := []ZendeskUserToSlackUserMap{}
	for _, m := range res.Data.Organization.ZendeskUsers {
		zdToSlackUserMap = append(zdToSlackUserMap, ZendeskUserToSlackUserMap{
			ZendeskUserID: m.Id,
			SlackUserID:   slackLookup[m.Email].Id,
		})
	}

	//b, err := json.MarshalIndent(zdToSlackUserMap, "", "")
	b, err := json.Marshal(zdToSlackUserMap)
	if err != nil {
		fmt.Println(err)
		return
	}


	// todo, make this an API call
	// curl 'https://graph.usepylon.com/graphql?q=updateSlackZendeskPairings' \
	//  --data-raw $'{"query":"mutation updateSlackZendeskPairings...'
	fmt.Println(string(b))
}
