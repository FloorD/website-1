---
title: Managing Logs
sideBarPosition: 1
---

Need help getting logs from your Tembo Instances? This guide can help.

## Loki

Tembo uses [Loki](https://grafana.com/docs/loki/) for logs. Tembo grants users access to the Loki API. Users must include an **Authorization** header, which is a Tembo Cloud token (see [authentication](/docs/development/api)), and a header **X-Scope-OrgID**, which should be set to the Tembo Organization ID (for more information, see Loki docs on multi-tenancy [here](https://grafana.com/docs/loki/latest/operations/multi-tenancy/)).

## Examples

### API

Here is an example script that calls the Tembo Loki API to stream all logs for one instance:

```bash
# Your Tembo Org ID
ORG_ID="****"
# Your Tembo Instance ID
INSTANCE_ID="****"
# Your Tembo Cloud token
TOKEN="****"

# Loki LogQL query, selecting by instance ID
QUERY="{tembo_instance_id=\"${INSTANCE_ID}\"}"

URL_ENCODED_QUERY=$(echo -n "$QUERY" | jq -sRr @uri)

# Websocat is like curl, but for websocket endpoints
websocat "wss://api.data-1.use1.tembo.io/loki/api/v1/tail?query=$URL_ENCODED_QUERY" \
  -H "X-Scope-OrgID: ${ORG_ID}" \
  -H "Authorization: Bearer ${TOKEN}"
```

There are other endpoints available. Please review the [Loki API documentation](https://grafana.com/docs/loki/latest/reference/api/) for more details.

### Grafana

To connect your Grafana server to Tembo's logging server, [add a new data source](https://grafana.com/docs/loki/latest/visualize/grafana/).

-   Select "Loki" as the data source type
-   For URL, configure your data plane domain name. For example, `https://api.data-1.use1.tembo.io/`.
-   Add two HTTP Headers configurations:
    -   Header: `X-Scope-OrgID`, Value: `your-tembo-org-here`
    -   Header: `Authorization`, Value: `Bearer your-tembo-cloud-token-here`
