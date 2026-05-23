# Stripe Skill (LifeOS)

- Implement subscription flows for Free, Pro, Family, Executive AI plans.
- Verify webhook signatures and handle idempotency safely.
- Keep billing state mirrored in database (customer, subscription, status).
- Never expose secret keys in client code.
- Add robust error handling and clear fallback states in billing UI.
