"""add ask mode to course/lesson/script

Revision ID: ba519a52e38a
Revises: 34b3d41af2fb
Create Date: 2024-09-26 06:59:49.722760

"""
from alembic import op
import sqlalchemy as sa

from flaskr.service.lesson.const import ASK_MODE_ENABLE


# revision identifiers, used by Alembic.
revision = "ba519a52e38a"
down_revision = "34b3d41af2fb"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("ai_course", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "ask_mode",
                sa.Integer(),
                nullable=False,
                comment="Ask mode",
                default=ASK_MODE_ENABLE,
            )
        )

    with op.batch_alter_table("ai_lesson", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "ask_mode",
                sa.Integer(),
                nullable=False,
                comment="Ask mode",
                default=ASK_MODE_ENABLE,
            )
        )

    with op.batch_alter_table("ai_lesson_script", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "ask_mode",
                sa.Integer(),
                nullable=False,
                comment="Ask mode",
                default=ASK_MODE_ENABLE,
            )
        )

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("ai_lesson_script", schema=None) as batch_op:
        batch_op.drop_column("ask_mode")

    with op.batch_alter_table("ai_lesson", schema=None) as batch_op:
        batch_op.drop_column("ask_mode")

    with op.batch_alter_table("ai_course", schema=None) as batch_op:
        batch_op.drop_column("ask_mode")

    # ### end Alembic commands ###
