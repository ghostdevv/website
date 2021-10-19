<article>
    <img class="image" src="https://via.placeholder.com/1920x1080" alt="Pog" />

    <div class="details">
        <span class="tag"> BLOG </span>

        <h4 class="title">How to do x in y</h4>

        <p class="description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint iure
            nesciunt dolore nulla, consectetur placeat rerum esse iusto laborum
        </p>
    </div>
</article>

<style lang="scss">
    article {
        $borderRadius: 12px;

        display: flex;
        flex-direction: column;
        gap: 0px;

        width: 325px;

        background-color: var(--background-secondary);
        border-radius: $borderRadius;

        flex-grow: 1;

        .image {
            width: 100%;
            height: auto;

            border-radius: $borderRadius $borderRadius 0px 0px;
        }

        .details {
            display: flex;
            flex-direction: column;
            gap: 4px;

            .tag {
                margin-bottom: 4px;
            }

            padding: 18px;

            .tag {
                background-color: rgba(33, 96, 236, 0.5);
                color: rgba(33, 96, 236);

                border-radius: 16px;

                padding: 4px 16px;
                font-size: 11px;
                font-weight: 800;

                height: fit-content;
                width: fit-content;
            }

            .description {
                color: rgba(var(--text-rgb), 0.6);
            }
        }
    }
</style>
